const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const chatBox = document.getElementById('chat-box');

// حافظه و دانش
let memory = [];
let knowledge = {};
let personality = {
  tone: 'دوستانه',
  style: 'خلاق',
  name: 'هاشم',
};

// ارسال پیام
sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  learnFrom(userText);
  const reply = generateResponse(userText);
  memory.push({ user: userText, bot: reply });

  setTimeout(() => addMessage(reply, 'bot'), 500);
}

// یادگیری از پیام
function learnFrom(text) {
  const words = text.split(/\s+/);
  words.forEach(word => {
    if (!knowledge[word]) {
      knowledge[word] = { count: 1, examples: [text] };
    } else {
      knowledge[word].count++;
      knowledge[word].examples.push(text);
    }
  });
}

// تولید پاسخ
function generateResponse(text) {
  const lower = text.toLowerCase();

  if (lower.includes('اسم من')) {
    const name = extractName(text);
    personality.name = name;
    return `خوشحال شدم ${name} عزیز! حالا اسمت رو یاد گرفتم.`;
  }

  if (lower.includes('چه چیزایی یاد گرفتی')) {
    const topWords = Object.entries(knowledge)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([word, data]) => `${word} (${data.count} بار)`);

    return `تا الان اینا رو بیشتر یاد گرفتم:\n${topWords.join('\n')}`;
  }

  if (lower.includes('تو کی هستی')) {
    return `من ${personality.name} هستم، یه هوش مصنوعی که داره از تو یاد می‌گیره.`;
  }

  // پاسخ خلاقانه بر اساس حافظه
  const related = findRelatedWords(text);
  if (related.length > 0) {
    return `جمله‌ات منو یاد اینا انداخت:\n${related.join('\n')}`;
  }

  return `جالب بود! این جمله رو هم یاد گرفتم: "${text}"`;
}

// استخراج اسم
function extractName(text) {
  const match = text.match(/اسم من (.+)/);
  return match ? match[1].trim() : 'دوست من';
}

// پیدا کردن کلمات مرتبط
function findRelatedWords(text) {
  const words = text.split(/\s+/);
  let results = [];

  words.forEach(word => {
    if (knowledge[word] && knowledge[word].examples.length > 1) {
      results.push(`"${word}" در جمله‌هایی مثل: ${knowledge[word].examples.slice(0, 2).join(' | ')}`);
    }
  });

  return results;
}

// نمایش پیام
function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
