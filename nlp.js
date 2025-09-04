export function analyzeSentence(text) {
  const words = text.split(/\s+/);
  const keywords = words.filter(w => w.length > 3);
  const intent = detectIntent(text);
  const categories = categorizeWords(keywords);
  return { keywords, intent, categories };
}

function detectIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes('اسم من')) return 'set_name';
  if (lower.includes('تو کی هستی')) return 'identity';
  if (lower.includes('چه چیزایی یاد گرفتی')) return 'knowledge_summary';
  if (lower.includes('کد') || lower.includes('برنامه')) return 'code_request';
  return 'general';
}

function categorizeWords(words) {
  const categories = {};
  words.forEach(word => {
    if (['ماشین', 'اتومبیل', 'خودرو'].includes(word)) {
      categories[word] = 'vehicle';
    } else if (['عشق', 'دوست داشتن', 'علاقه'].includes(word)) {
      categories[word] = 'emotion';
    } else if (['کد', 'جاوااسکریپت', 'پایتون'].includes(word)) {
      categories[word] = 'programming';
    } else {
      categories[word] = 'general';
    }
  });
  return categories;
}
