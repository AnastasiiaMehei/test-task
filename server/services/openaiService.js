import OpenAI from 'openai';
import { config } from '../config/config.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

export const handleAudioMessage = async (audioData) => {
  try {
    const response = await openai.audio.speech.create({
      model: config.openai.model,
      input: audioData,
      voice: config.openai.voice,
      response_format: "json"
    });
    return response;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
};
