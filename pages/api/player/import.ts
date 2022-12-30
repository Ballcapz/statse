import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import * as csv from "@fast-csv/parse";
import busboy from "busboy";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    await importHandler(req, session);

    return res.status(201).json({ ok: true });
  } else {
    return res.status(405);
  }
}

async function importHandler(req: NextApiRequest, session: Session) {
  return new Promise((resolve) => {
    const b = busboy({ headers: req.headers });
    // console.log(JSON.stringify(req.headers, null, 2));

    // @ts-expect-error
    b.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log("ON FILE:");
      file.on("data", (data: any) => {
        console.log("File [" + fieldname + "] got " + data.length + " bytes");

        const stream = Readable.from(data);
        let rOne: Array<any> = [];

        csv
          .parseStream(stream, { headers: true })
          .on("error", (error) => console.error(error))
          .on("data", (row) => {
            rOne.push(row);
          })
          .on("end", async (count: number) => {
            console.log(`Parsed ${count} rows`);

            rOne = rOne.map((playerObj) => {
              const lowered = keysToLowerCase(playerObj);
              return {
                name: lowered.name,
                playerNumber: lowered.number,
                // @ts-expect-error
                userId: session.user?.id,
              };
            });

            const dbRes = await prisma.player.createMany({
              data: rOne,
              skipDuplicates: true,
            });

            console.log({ dbRes });
          });
      });
    });

    b.on("field", (fieldname, val) => {
      console.log({ fieldname });
    });

    b.on("finish", () => {
      console.log("Done!");

      resolve(1);
    });

    req.pipe(b);
  });
}

function keysToLowerCase(obj: any): any {
  const keys = Object.keys(obj);
  let n = keys.length;

  let newObj: any = {};
  while (n--) {
    const key = keys[n];
    newObj[key.toLowerCase()] = obj[key];
  }

  return newObj;
}
