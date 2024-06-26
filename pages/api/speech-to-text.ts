import { fileLoader } from "@/server/config/multer";
import { services } from "@/server/services/speech.to.text";

import type { NextApiResponse } from "next";

export const config = fileLoader.disableBodyParser();

export default async function handler(req: any, res: NextApiResponse) {
  try {
    await fileLoader.uploadFileTemp(req, res);
    console.log(req.file);
    const response = await services.speechToText({
      apiKey: req.headers.api_key as string,
      file: req.file,
    });
    return res.status(200).json({ data: response });
  } catch (e: any) {
    return res.status(500).json({ e: e });
  }
}
