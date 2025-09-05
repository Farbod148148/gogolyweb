const API_URL = 'http://localhost:3000/memory';

export async function loadMemory() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function saveMemory(data) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
