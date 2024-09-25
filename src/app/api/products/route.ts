import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const products = await db.product.findMany({
        where: { isAvailableForPurchase: true },
      });

      // If products array is empty, return a message or empty array
      if (!products || products.length === 0) {
        return res.status(200).json({ message: "No products available" });
      }

      res.status(200).json(products);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    // Handle any potential errors
    console.error("Failed to fetch products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
