import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const GITHUB_ID = process.env.GITHUB_ID || "Ov23liKzd4OZFPD4tsKB";
const GITHUB_SECRET =
  process.env.GITHUB_SECRET || "504ee2796b50f840b8af74e885ecc0cf4e76490f";
const GOOGLE_ID =
  process.env.GOOGLE_ID ||
  "790822703356-h6lrohlh4b65kppr744l4317f0inv09g.apps.googleusercontent.com";
const GOOGLE_SECRET =
  process.env.GOOGLE_SECRET || "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";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
