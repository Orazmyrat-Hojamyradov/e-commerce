"use server";

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products =
      (await db.product.findMany({
        where: { isAvailableForPurchase: true },
      })) || [];
    res.status(200).json(products);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
