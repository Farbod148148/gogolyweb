// کلیدهای ذخیره‌سازی در مرورگر
const MEMORY_KEY = 'hasham_ai_memory';
const KNOWLEDGE_KEY = 'hasham_ai_knowledge';
const PERSONALITY_KEY = 'hasham_ai_personality';

// حافظه مکالمه
export function loadMemory() {
  return JSON.parse(localStorage.getItem(MEMORY_KEY)) || [];
}

export function saveMemory(memory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

// دانش یادگرفته‌شده
export function loadKnowledge() {
  return JSON.parse(localStorage.getItem(KNOWLEDGE_KEY)) || {};
}

export function saveKnowledge(knowledge) {
  localStorage.setItem(KNOWLEDGE_KEY, JSON.stringify(knowledge));
}

// شخصیت هوش مصنوعی
export function loadPersonality() {
  return JSON.parse(localStorage.getItem(PERSONALITY_KEY)) || {
    tone: 'دوستانه',
    style: 'خلاق',
    name: 'هاشم',
  };
}

export function savePersonality(personality) {
  localStorage.setItem(PERSONALITY_KEY, JSON.stringify(personality));
}
