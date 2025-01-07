const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const config = {
    openai: {
      apiKey: OPENAI_API_KEY,
      model: "whisper-1",
      voice: "alloy"
    },
    server: {
      port: process.env.PORT || 8080
    }
  };
  