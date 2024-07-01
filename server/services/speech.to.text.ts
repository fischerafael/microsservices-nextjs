import fs from "fs";
import OpenAI from "openai";

const speechToText = async ({
  apiKey,
  file,
}: {
  apiKey: string;
  file: any;
}) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(file.path),
    model: "whisper-1",
  });

  return transcription;
};

export const services = {
  speechToText,
};
