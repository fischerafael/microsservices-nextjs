import { fileLoader } from "@/server/config/multer";
import { services } from "@/server/services/speech.to.text";
import { usersService } from "@/server/services/user";

import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query, headers, body } = req;
    if (method === "POST") {
      const {} = await usersService.createUser({
        app: headers.app as string,
        email: body.email,
        fistName: "",
        lastName: "",
      });
      return res.status(200).json({ data: "ok" });
    }
    return res.status(405).json({ data: "Not Implemented" });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ e: e });
  }
}
