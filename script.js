import * as webllm from 'https://mlc.ai/web-llm/dist/index.js';

const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const chatBox = document.getElementById('chat-box');

let chatModule;

async function initModel() {
  addMessage('⏳ در حال بارگذاری مدل هوش مصنوعی...', 'bot');
  chatModule = await webllm.CreateChatModule();
  await chatModule.reload('Llama-3-8B-Instruct-q4f32_1-MLC');
  addMessage('✅ مدل بارگذاری شد! حالا می‌تونی سوال بپرسی.', 'bot');
}

sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

async function handleSend() {
  const userText = input.value.trim();
  if (!userText || !chatModule) return;

  addMessage(userText, 'user');
  input.value = '';

  const reply = await chatModule.chat({ prompt: userText });
  addMessage(reply.output, 'bot');
}

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

initModel();
