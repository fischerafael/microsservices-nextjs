import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

// limit - 1:30 or 1200 chars
const speechToText = async () => {
  const file = "./sample/teste-longo.wav";
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(file),
    model: "whisper-1",
  });
  return transcription;
};

export const services = {
  speechToText,
};
