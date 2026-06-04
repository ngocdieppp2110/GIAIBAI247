<!DOCTYPE html>

<html lang="vi">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>EduAI - AI Giải Bài Tập</title>

<link rel="stylesheet" href="style.css">

<script src="https://unpkg.com/tesseract.js@5/dist/tesseract.min.js"></script>

</head>

<body>

<div class="container">

<div class="sidebar">

<div class="logo-area">

<<div class="logo-icon">
🤖
</div>

<h1>EduAI</h1>

<p>AI Giải Bài Tập</p>

</div>

<div class="slogan">

Học tập thông minh cùng AI

</div>

<div class="feature-card">

📷 Chụp ảnh bài tập

<span>Nhận diện và giải nhanh</span>

</div>

<div class="feature-card">

💬 Trò chuyện với AI

<span>Giải thích dễ hiểu</span>

</div>

<div class="feature-card">

📚 Nhiều môn học

<span>Hỗ trợ toàn bộ môn</span>

</div>

<div class="feature-card">

🛡️ Bảo mật

<span>An toàn dữ liệu</span>

</div>

</div>

<div class="main">

<header>

<div class="menu-btn">
☰
</div>

<div class="header-logo">

<div class="mini-logo">
🤖
</div>

<div>
<h2>EduAI</h2>
<p>AI Giải Bài Tập</p>
</div>

</div>

<div class="header-icons">

<button>🌙</button>

<button>👤</button>

</div>

</header>

<div class="banner">

<div class="banner-text">

<h1>Học tốt mỗi ngày</h1>

<p>
Chụp ảnh hoặc nhập câu hỏi để AI giải bài tập
</p>

</div>

<div class="banner-image">

<div class="banner-icon">
🎓📚✨
</div>

</div>

</div>

<section class="subjects">

<div class="subject active" onclick="chooseSubject('Toán')">
📘 Toán
</div>

<div class="subject" onclick="chooseSubject('Vật lý')">
⚛️ Vật lý
</div>

<div class="subject" onclick="chooseSubject('Hóa học')">
🧪 Hóa học
</div>

<div class="subject" onclick="chooseSubject('Sinh học')">
🧬 Sinh học
</div>

<div class="subject" onclick="chooseSubject('Tiếng Anh')">
🇬🇧 Tiếng Anh
</div>

<div class="subject" onclick="chooseSubject('Ngữ Văn')">
📖 Ngữ Văn
</div>

<div class="subject" onclick="chooseSubject('Lịch sử')">
🏛️ Lịch sử
</div>

<div class="subject" onclick="chooseSubject('Địa lý')">
🌍 Địa lý
</div>

<div class="subject" onclick="chooseSubject('GDCD')">
⚖️ GDCD
</div>

<div class="subject" onclick="chooseSubject('Tin học')">
💻 Tin học
</div>

<div class="subject" onclick="chooseSubject('Công nghệ')">
⚙️ Công nghệ
</div>

<div class="subject" onclick="chooseSubject('KHTN')">
🔬 KHTN
</div>

</section>

<div class="chat-area">

<div id="messages">

<div class="ai-message">

👋 Xin chào!

Bạn cần mình giải bài tập gì hôm nay?

</div>

</div>

</div>

<div class="input-panel">

<select id="subject">

<option>Toán</option>
<option>Vật lý</option>
<option>Hóa học</option>
<option>Sinh học</option>
<option>Tiếng Anh</option>
<option>Ngữ Văn</option>
<option>Lịch sử</option>
<option>Địa lý</option>
<option>GDCD</option>
<option>Tin học</option>
<option>Công nghệ</option>
<option>KHTN</option>

</select>

<textarea
id="question"
placeholder="Nhập bài tập hoặc câu hỏi...">
</textarea>

<img
id="preview"
style="display:none">

<div class="action-buttons">

<button
class="camera-btn"
onclick="document.getElementById('imageInput').click()">

📷 Chụp đề bài

</button>

<button onclick="solve()">

🚀 Giải bài

</button>

</div>

<input
type="file"
id="imageInput"
accept="image/*"
capture="environment"
style="display:none">

</div>

<footer>

<<div class="footer-item" onclick="showHistory()">
🕒 Lịch sử
</div>

<div class="footer-item" onclick="showFavorites()">
❤️ Yêu thích
</div>

<<div class="footer-item" onclick="showProfile()">
👤 Tài khoản
</div>

</footer>

</div>

</div>

<!-- Popup lịch sử -->

<div id="historyModal" class="history-modal">

<div class="history-box">

<div class="history-header">

<h2>Lịch sử giải bài</h2>

<button onclick="closeHistory()">
✖
</button>

</div>

<div id="historyList">

</div>

</div>

</div>

<script src="script.js"></script>

</body>
</html>
