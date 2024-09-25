import db from "@/db/db";
import nextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const GITHUB_ID = "Ov23liKzd4OZFPD4tsKB";
const GITHUB_SECRET = "504ee2796b50f840b8af74e885ecc0cf4e76490f";
const GOOGLE_ID =
  "790822703356-h6lrohlh4b65kppr744l4317f0inv09g.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";

export const authOptions: AuthOptions = {
  secret: "f4370d7db38f960b8e5b12863567103e59b1eef2dfd0840f21bc305e43c64b3a",
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_ID as string,
      clientSecret: GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID as string,
      clientSecret: GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.username as string | undefined,
          },
        });

        if (!user) throw new Error("Username or password is not correct");

        //bad way
        const isPasswordCorrect = credentials?.password == user.password;

        //normal way to auth
        // if (!credentials?.password)
        //   throw new Error("Please Provide Your Password");
        // const isPasswordCorrect = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );

        if (!isPasswordCorrect)
          throw new Error("User name or password is not correct");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],
};

const handler = nextAuth(authOptions);

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
