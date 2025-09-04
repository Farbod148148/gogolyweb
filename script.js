const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const chatBox = document.getElementById('chat-box');

let memory = []; // حافظه مکالمه
let personality = {
  tone: 'دوستانه',
  style: 'خلاق',
  knowledge: [],
};

sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  const reply = generateResponse(userText);
  memory.push({ user: userText, bot: reply });
  setTimeout(() => addMessage(reply, 'bot'), 500);
}

function generateResponse(text) {
  const lower = text.toLowerCase();
  let response = '';

  // یادگیری از سوالات قبلی
  if (lower.includes('اسم من')) {
    const name = extractName(text);
    personality.name = name;
    response = `خوشحال شدم ${name} عزیز! حالا دیگه اسمت رو یاد گرفتم.`;
  } else if (lower.includes('تو کی هستی')) {
    response = `من یه هوش مصنوعی هستم که توسط @ureof ساخته شده‌ام. فعلاً دارم یاد می‌گیرم!`;
  } else if (lower.includes('دوست داری')) {
    response = `من عاشق یاد گرفتن چیزای جدیدم. هر چی بیشتر باهام حرف بزنی، بهتر می‌شم.`;
  } else if (lower.includes('یاد گرفتی')) {
    response = `تا الان اینا رو یاد گرفتم:\n${personality.knowledge.join('\n') || 'هنوز چیزی یاد نگرفتم 😅'}`;
  } else {
    // یادگیری عمومی
    personality.knowledge.push(text);
    response = `جالب بود! اینو یاد گرفتم: "${text}"`;
  }

  return applyPersonality(response);
}

function extractName(text) {
  const match = text.match(/اسم من (.+)/);
  return match ? match[1].trim() : 'دوست من';
}

function applyPersonality(text) {
  if (personality.tone === 'دوستانه') {
    return text + ' 😊';
  }
  return text;
}

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
