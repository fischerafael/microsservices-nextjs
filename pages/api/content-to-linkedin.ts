import { contentToLinkedin } from "@/modules/content-to-linkedin/backend";
import { usersService } from "@/server/services/user";

import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query, headers, body } = req;
    if (method === "POST") {
      const output = await contentToLinkedin.create(
        headers.owner as string,
        body.title,
        body.template,
        body.tags,
        body.description
      );
      return res.status(201).json({ data: output });
    }

    if (method === "DELETE") {
      await contentToLinkedin.remove(query.id as string);
      return res.status(204).json({ data: "" });
    }

    if (method === "GET") {
      const output = await contentToLinkedin.list(headers.user as string);

      return res.status(200).json({ data: output });
    }

    if (method === "PATCH") {
      await contentToLinkedin.update(query.id as string, body);
      return res.status(204).json({ data: "output" });
    }

    return res.status(405).json({ data: "Not Implemented" });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ e: e });
  }
}
