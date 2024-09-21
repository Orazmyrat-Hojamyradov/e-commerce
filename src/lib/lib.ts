import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  img?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.HASHED_PASSWORD!,
  cookieName: "session-e-store",
  cookieOptions: {
    httpOnly: true,
    secure: false,
  },
};
