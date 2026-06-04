const API_KEY = "AQ.Ab8RN6LijHxkjN6LWp8aEAFELSzEsetHNbPpmijkBT_NfaGepA";
let lastQuestion = "";
let lastAnswer = "";
let currentSubject = "Toán";

/* CHỌN MÔN HỌC */

function chooseSubject(subject){

currentSubject = subject;

document.getElementById("subject").value =
subject;

document
.querySelectorAll(".subject")
.forEach(item=>{
item.classList.remove("active");
});

event.currentTarget.classList.add("active");

}

/* XEM TRƯỚC ẢNH + OCR */

document
.getElementById("imageInput")
.addEventListener(
"change",
async function(e){

const file = e.target.files[0];

if(!file) return;

const preview =
document.getElementById("preview");

preview.src =
URL.createObjectURL(file);

preview.style.display =
"block";

const messages =
document.getElementById("messages");

messages.innerHTML += `
<div class="ai-message">
📷 Đang nhận diện văn bản...
</div>
`;

try{

const result =
await Tesseract.recognize(
file,
"vie+eng"
);

document.getElementById("question").value =
result.data.text;

messages.innerHTML += `
<div class="ai-message">
✅ Đã nhận diện đề bài.
</div>
`;

}
catch(error){

messages.innerHTML += `
<div class="ai-message">
❌ Không đọc được ảnh.
</div>
`;

console.log(error);

}

}
);

/* GỬI CÂU HỎI */

async function solve(){

const question =
document.getElementById("question")
.value.trim();

if(question === ""){

alert("Vui lòng nhập bài tập");

return;

}

const messages =
document.getElementById("messages");

/* TIN NHẮN NGƯỜI DÙNG */

messages.innerHTML += `
<div class="user-message">
${question}
</div>
`;

messages.scrollTop =
messages.scrollHeight;

/* THÔNG BÁO ĐANG GIẢI */

messages.innerHTML += `
<div class="ai-message" id="loading">
⏳ Đang giải bài...
</div>
`;

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:
`
Bạn là giáo viên môn ${currentSubject}.

Hãy giải bài tập thật dễ hiểu.

Yêu cầu:

- Trả lời bằng tiếng Việt.
- Giải theo từng bước.
- Ngắn gọn.
- Không dùng dấu *.
- Không dùng dấu #.
- Không markdown.
- Không lan man.
- Chỉ ghi các bước cần thiết.
- Cuối cùng ghi:

Đáp án: ...

Bài tập:

${question}
`
}
]
}
]
})
}
);

const data =
await response.json();

document
.getElementById("loading")
.remove();

if(data.error){

messages.innerHTML += `
<div class="ai-message">
❌ ${data.error.message}
</div>
`;

return;

}

let answer =
data.candidates[0]
.content.parts[0]
.text;

/* DỌN KÝ TỰ */

answer =
answer.replace(/\*\*/g,"");

answer =
answer.replace(/\*/g,"");

answer =
answer.replace(/##/g,"");

answer =
answer.replace(/#/g,"");

/* HIỂN THỊ */

lastQuestion = question;
lastAnswer = answer;

messages.innerHTML += `
<div class="ai-message">
${answer.replace(/\n/g,"<br>")}

<br><br>

<button onclick="saveFavorite()">
⭐ Lưu yêu thích
</button>

</div>
`;

let history =
JSON.parse(localStorage.getItem("history")) || [];

history.push({
subject: currentSubject,
question: question,
answer: answer,
time: new Date().toLocaleString()
});

localStorage.setItem(
"history",
JSON.stringify(history)
);
messages.scrollTop =
messages.scrollHeight;

document.getElementById("question").value =
"";

}
catch(error){

console.log(error);

const loading =
document.getElementById("loading");

if(loading){
loading.remove();
}

messages.innerHTML += `
<div class="ai-message">
❌ Không thể kết nối AI
</div>
`;

}

alert("Thông tin tài khoản sẽ hiện ở đây");

}

function showHistory(){

let history =
JSON.parse(localStorage.getItem("history")) || [];

if(history.length === 0){

alert("Chưa có lịch sử.");

return;

}

let text = "";

history.reverse().forEach((item,index)=>{

text +=
(index+1)+". "+item.subject+"\n"+
item.question+"\n"+
item.time+"\n\n";

});

alert(text);

}

function saveFavorite(){

let fav =
JSON.parse(localStorage.getItem("favorites")) || [];

fav.push({
question:lastQuestion,
answer:lastAnswer
});

localStorage.setItem(
"favorites",
JSON.stringify(fav)
);

alert("Đã lưu vào yêu thích");

}

function showHistory(){

let history =
JSON.parse(localStorage.getItem("history")) || [];

let html = "";

history.reverse().forEach((item,index)=>{

html += `
<div class="history-item"
onclick="loadHistory(${history.length-1-index})">

<b>${item.subject}</b><br>

${item.question.substring(0,80)}

</div>
`;

});

document.getElementById("historyList").innerHTML =
html;

document.getElementById("historyModal").style.display =
"block";

}

function showFavorites(){

let fav =
JSON.parse(localStorage.getItem("favorites")) || [];

if(fav.length===0){

alert("Chưa có bài yêu thích");

return;

}

let text="";

fav.forEach((item,index)=>{

text +=
(index+1)+". "+
item.question+
"\n\n";

});

alert(text);

}

function showProfile(){

let history =
JSON.parse(localStorage.getItem("history")) || [];

let fav =
JSON.parse(localStorage.getItem("favorites")) || [];

alert(
"EduAI\n\n"+
"Số bài đã giải: "+
history.length+
"\n\n"+
"Số bài yêu thích: "+
fav.length
);

}

function closeHistory(){

document.getElementById("historyModal").style.display =
"none";

}

function loadHistory(index){

let history =
JSON.parse(localStorage.getItem("history")) || [];

let item = history[index];

document.getElementById("question").value =
item.question;

const messages =
document.getElementById("messages");

messages.innerHTML += `
<div class="user-message">
${item.question}
</div>

<div class="ai-message">
${item.answer.replace(/\n/g,"<br>")}
</div>
`;

closeHistory();

}