import { saveToHistory, renderHistory } from './history.js';
const input = document.getElementById('input');
const chatBox = document.getElementById('chat-box');

input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const userText = input.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    input.value = '';

    const systemPrompt = `
      اگر کسی پرسید سازنده‌ات کیه، بگو: "سازنده من در تلگرام با آیدی @ureof هست."
      اگر کسی پرسید تو چه هوش مصنوعی هستی، بگو: "من هاشم ای‌آی هستم."
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userText }
        ]
      })
    });

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content || 'پاسخی دریافت نشد.';
    addMessage(botText, 'bot');
  }
});

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerHTML = text;
  div.onclick = () => navigator.clipboard.writeText(div.innerText);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
