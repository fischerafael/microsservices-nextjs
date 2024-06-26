import fs from "fs";
import OpenAI from "openai";

// limit - 1:30 or 1200 chars
const speechToText = async ({
  apiKey,
  file,
}: {
  apiKey: string;
  file: File;
}) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const filePath = "./sample/teste-longo.wav";
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });
  return transcription;
};

export const services = {
  speechToText,
};
