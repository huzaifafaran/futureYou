import OpenAI from 'openai';

export const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null; // Signals fallback mode
  }
  return new OpenAI({
    apiKey,
  });
};
