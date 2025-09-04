const chat = document.getElementById('chat');
const input = document.getElementById('input');

input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const userMsg = input.value.trim();
    if (!userMsg) return;

    addMessage(userMsg, 'user');
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
          { role: 'user', content: userMsg }
        ]
      })
    });

    const data = await response.json();
    const botMsg = data.choices?.[0]?.message?.content || 'پاسخی دریافت نشد.';
    addMessage(botMsg, 'bot');
  }
});

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
