// "use server";

// import db from "@/db/db";
// import { z } from "zod";
// import fs from "fs/promises";
// import { notFound, redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// const fileSchema = z.instanceof(File, { message: "Required" });
// const imageSchema = fileSchema.refine(
//   (file) => file.size === 0 || file.type.startsWith("image/")
// );

// const addSchema = z.object({
//   name: z.string().min(1),
//   descryption: z.string().min(1),
//   priceInCents: z.coerce.number().int().min(1),
//   file: fileSchema.refine((file) => file.size > 0, "Required"),
//   image: imageSchema.refine((file) => file.size > 0, "Required"),
// });

// export async function addProduct(prevState: unknown, formData: FormData) {
//   const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }

//   const data = result.data;

//   await fs.mkdir("products", { recursive: true });
//   const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

//   await fs.mkdir("public/products", { recursive: true });
//   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//   await fs.writeFile(
//     `public${imagePath}`,
//     Buffer.from(await data.image.arrayBuffer())
//   );

//   await db.product.create({
//     data: {
//       isAvailableForPurchase: false,
//       name: data.name,
//       descryption: data.descryption,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//     },
//   });

//   revalidatePath("/");
//   revalidatePath("/products");

//   redirect("/admin/products");
// }

// const editSchema = addSchema.extend({
//   file: fileSchema.optional(),
//   image: imageSchema.optional(),
// });

// export async function updateProduct(
//   id: string,
//   prevState: unknown,
//   formData: FormData
// ) {
//   const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }

//   const data = result.data;
//   const product = await db.product.findUnique({ where: { id } });

//   if (product == null) return notFound();

//   let filePath = product.filePath;
//   if (data.file != null && data.file.size > 0) {
//     await fs.unlink(product.filePath);
//     filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//     await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
//   }

//   let imagePath = product.imagePath;
//   if (data.image != null && data.image.size > 0) {
//     await fs.unlink(`${product.imagePath}`);
//     imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//     await fs.writeFile(
//       `public${imagePath}`,
//       Buffer.from(await data.image.arrayBuffer())
//     );
//   }

//   await db.product.update({
//     where: { id },
//     data: {
//       name: data.name,
//       descryption: data.descryption,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//     },
//   });

//   revalidatePath("/");
//   revalidatePath("/products");

//   redirect("/admin/products");
// }

// export async function toggleProductAvailability(
//   id: string,
//   isAvailableForPurchase: boolean
// ) {
//   await db.product.update({
//     where: { id },
//     data: {
//       isAvailableForPurchase,
//     },
//   });

//   revalidatePath("/");
//   revalidatePath("/products");
// }
// export async function deleteProduct(id: string) {
//   const product = await db.product.delete({
//     where: { id },
//   });
//   if (product == null) return notFound();

//   await fs.unlink(product.filePath);
//   await fs.unlink(`public${product.imagePath}`);

//   revalidatePath("/");
//   revalidatePath("/products");
// }

"use server";

import db from "@/db/db"; // Adjust the path to your database connection as needed
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Validation schemas
const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  descryption: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

// Ensure directory exists
async function ensureDirectoryExists(dir: any) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error: any) {
    if (error.code !== "EEXIST") {
      throw error; // Rethrow if it's not a directory already existing
    }
  }
}

// Add product
export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Ensure the directories exist
  await ensureDirectoryExists("products");
  await ensureDirectoryExists("public/products");

  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      descryption: data.descryption,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

// Edit product schema
const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

// Update product
export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      descryption: data.descryption,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

// Toggle product availability
export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
}

// Delete product
export async function deleteProduct(id: string) {
  const product = await db.product.delete({
    where: { id },
  });
  if (product == null) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}
