import { withIronSessionApiRoute } from "iron-session";
import { SessionOptions } from "iron-session";
import { NextApiHandler } from "next";

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "maktab90_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
