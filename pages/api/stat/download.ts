import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import * as csv from "@fast-csv/format";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401);
  }

  const allStats = await prisma.stat
    .findMany({
      where: {
        userId: session.user?.id,
      },
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error_code: "failed_to_read_stats" });
    });

  if (!allStats) {
    return res.status(404).json({ error_code: "none_found" });
  }

  const csvStream = csv.format({ headers: true });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=stats.csv");
  csvStream.pipe(res).on("finish", () => {
    res.end();
  });

  allStats.forEach((stat) => {
    csvStream.write(stat);
  });

  csvStream.end();
}
