import {
  loadMemory, saveMemory,
  loadKnowledge, saveKnowledge,
  loadPersonality, savePersonality
} from './memory.js';

import { analyzeSentence } from './nlp.js';

const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const chatBox = document.getElementById('chat-box');

let memory = loadMemory();
let knowledge = loadKnowledge();
let personality = loadPersonality();

memory.forEach(entry => {
  addMessage(entry.user, 'user');
  addMessage(entry.bot, 'bot');
});

sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  const analysis = analyzeSentence(userText);
  learnFrom(userText, analysis);
  const reply = generateResponse(userText, analysis);

  memory.push({ user: userText, bot: reply });
  saveMemory(memory);
  saveKnowledge(knowledge);
  savePersonality(personality);

  setTimeout(() => addMessage(reply, 'bot'), 500);
}

function learnFrom(text, analysis) {
  analysis.keywords.forEach(word => {
    if (!knowledge[word]) {
      knowledge[word] = { count: 1, examples: [text], category: analysis.categories[word] };
    } else {
      knowledge[word].count++;
      knowledge[word].examples.push(text);
    }
  });
}

function generateResponse(text, analysis) {
  switch (analysis.intent) {
    case 'set_name':
      const name = extractName(text);
      personality.name = name;
      return `خوشحال شدم ${name} عزیز! حالا اسمت رو یاد گرفتم.`;

    case 'identity':
      return `من ${personality.name} هستم، یه هوش مصنوعی که داره از تو یاد می‌گیره.`;

    case 'knowledge_summary':
      const top = Object.entries(knowledge)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(([w, d]) => `${w} (${d.count} بار، دسته: ${d.category})`);
      return `تا الان اینا رو بیشتر یاد گرفتم:\n${top.join('\n')}`;

    case 'code_request':
      return `مثلاً این یه کد ساده جاوااسکریپت برای جمع دو عدده:\n\nlet sum = a + b;`;

    default:
      const related = findRelatedWords(analysis.keywords);
      if (related.length > 0) {
        return `جمله‌ات منو یاد اینا انداخت:\n${related.join('\n')}`;
      }
      return `جالب بود! این جمله رو هم یاد گرفتم: "${text}"`;
  }
}

function extractName(text) {
  const match = text.match(/اسم من (.+)/);
  return match ? match[1].trim() : 'دوست من';
}

function findRelatedWords(words) {
  let results = [];
  words.forEach(word => {
    if (knowledge[word] && knowledge[word].examples.length > 1) {
      results.push(`"${word}" در جمله‌هایی مثل: ${knowledge[word].examples.slice(0, 2).join(' | ')}`);
    }
  });
  return results;
}

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
