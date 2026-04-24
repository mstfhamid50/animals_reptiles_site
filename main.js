// --- 1. حفظ وتحميل الثيم (Storage Read/Write) ---
const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('user-theme') || 'light-theme';
document.body.className = currentTheme;

if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
        document.body.className = newTheme;
        localStorage.setItem('user-theme', newTheme);
    });
}

// --- 2. التحقق المخصص للنماذج (Custom Validation) ---
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('u-name').value;
        const email = document.getElementById('u-email').value;
        const msg = document.getElementById('u-msg').value;

        if(name.length < 5) {
            alert("⚠️ الاسم يجب أن يكون أكثر من 5 أحرف");
            return;
        }
        if(!email.includes('@') || !email.includes('.')) {
            alert("⚠️ يرجى إدخال بريد إلكتروني صحيح");
            return;
        }
        alert("✅ تم إرسال رسالتك بنجاح!");
    });
}

// --- 3. نظام التعليقات (Storage Read/Write) ---
const commentForm = document.getElementById('comment-form');
const displayArea = document.getElementById('comments-display');

function showComments() {
    if(!displayArea) return;
    const comments = JSON.parse(localStorage.getItem('web-comments')) || [];
    displayArea.innerHTML = comments.map(c => `
        <div style="border-bottom:1px solid #ccc; padding:10px;">
            <strong>👤 ${c.name}:</strong> <p>${c.text}</p>
        </div>
    `).join('');
}

if(commentForm) {
    commentForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('rev-name').value;
        const text = document.getElementById('rev-text').value;
        const comments = JSON.parse(localStorage.getItem('web-comments')) || [];
        comments.push({name, text});
        localStorage.setItem('web-comments', JSON.stringify(comments));
        showComments();
        commentForm.reset();
    };
}
showComments();