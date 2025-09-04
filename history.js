// کلید ذخیره‌سازی در localStorage
const STORAGE_KEY = 'hasham_ai_chat_history';

// ذخیره پیام جدید در تاریخچه
function saveToHistory(role, content) {
  const history = getHistory();
  history.push({ role, content });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// دریافت کل تاریخچه چت
function getHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// پاک کردن تاریخچه کامل
function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

// نمایش تاریخچه در رابط چت
function renderHistory(chatBox) {
  const history = getHistory();
  history.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.role}`;
    div.innerHTML = msg.content;
    div.onclick = () => navigator.clipboard.writeText(div.innerText);
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}
