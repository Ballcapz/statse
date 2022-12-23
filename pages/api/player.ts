import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const DUPLICATE_RECORD = "P2002";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    try {
      const result = await prisma.player.create({
        data: {
          name: body.name,
          playerNumber: body.number,
          userId: body.userId,
        },
      });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      // @ts-ignore
      if (err.code === DUPLICATE_RECORD) {
        return res.status(422).json({ error_code: "duplicate" });
      }
      return res.status(400).json({ error_code: "failed" });
    }
  } else {
    return res.status(405).json({ message: "method not allowed" });
  }
}
