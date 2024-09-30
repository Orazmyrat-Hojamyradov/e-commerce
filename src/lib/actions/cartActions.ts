//example of making cart w cookies

// "use server";

// import db from "@/db/db";
// import { cache } from "../cache";
// import { User } from "@prisma/client";

// import { ProductCardProps } from "@/app/components/ProductCard";
// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function AddToCart(data: ProductCardProps) {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("cart-oraz");

//   const ParsedArr: ProductCardProps[] = cartCookie
//     ? JSON.parse(cartCookie.value)
//     : [];

//   const updatedArr = [...ParsedArr, data];

//   cookieStore.set("cart-oraz", JSON.stringify(updatedArr), {
//     path: "/",
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   });

//   console.log("Element added to cart", data);

//   revalidatePath("/");
//   redirect("/");
// }

// export async function GetCart() {
//   const cartCookie = cookies().get("cart-oraz");
//   console.log("Cart Cookie:", cartCookie);

//   const CookieArr: ProductCardProps[] = cartCookie
//     ? JSON.parse(cartCookie.value)
//     : [];

//   return CookieArr;
// }

// export async function DeleteFromCart(id: string) {
//   const cartCookie = cookies().get("cart-oraz");

//   if (!cartCookie) return [];

//   const cartItems: ProductCardProps[] = JSON.parse(cartCookie.value || "[]");

//   const updatedArr = cartItems.filter((i) => i.id !== id);

//   cookies().set("cart-oraz", JSON.stringify(updatedArr), {
//     path: "/",
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   });

//   revalidatePath("/");
// }

// ("use server");

// export async function createUser(data: User) {
//   try {
//     return await db.user.create({
//       data: {
//         firstname: data.firstname,
//         lastname: data.lastname,
//         email: data.email,
//         password: data.password,
//         phone: data.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw new Error("Failed to create user");
//   }
// }
