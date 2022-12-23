import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401);
  }

  if (req.method === "GET") {
    try {
      const result = await prisma.stat.findMany({
        where: {
          userId: session.user?.id,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      // @ts-ignore
      return res.status(400).json({ error_code: "failed" });
    }
  } else {
    return res.status(405).json({ message: "method not allowed" });
  }
}
