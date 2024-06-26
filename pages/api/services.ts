// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { services } from "@/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await services.speechToText();
    return res.status(200).json({ data: response });
  } catch (e: any) {
    return res.status(500).json({ e: e.message });
  }
}
