import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/lib/data"; // Array with user data

// Environment variables for GitHub and Google credentials
const GITHUB_ID = process.env.GITHUB_ID || "Ov23liKzd4OZFPD4tsKB";
const GITHUB_SECRET =
  process.env.GITHUB_SECRET || "504ee2796b50f840b8af74e885ecc0cf4e76490f";
const GOOGLE_ID =
  process.env.GOOGLE_ID ||
  "790822703356-h6lrohlh4b65kppr744l4317f0inv09g.apps.googleusercontent.com";
const GOOGLE_SECRET =
  process.env.GOOGLE_SECRET || "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";

// Define the expected User type
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please provide both username and password.");
        }

        // Find the user in the array
        const user = users.find(
          (u) =>
            u.firstname === credentials.username ||
            u.email === credentials.username
        );

        if (!user) {
          throw new Error("User not found.");
        }

        // Check if the password matches
        const isPasswordCorrect = credentials.password === user.password;
        if (!isPasswordCorrect) {
          throw new Error("Invalid username or password.");
        }

        return {
          id: String(user.id),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        } as User;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
