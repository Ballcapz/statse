import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const DUPLICATE_RECORD = "P2002";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    try {
      const result = await prisma.stat.create({
        data: {
          singleMakes: body.singleMakes,
          singleTakes: body.singleTakes,
          drillName: body.drillName,
          playerName: body.playerName,
          userId: session.user?.id,
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
