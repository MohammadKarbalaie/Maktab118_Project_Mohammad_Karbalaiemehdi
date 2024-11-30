import { IronSession } from "iron-session";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    session: IronSession;  
  }
}

declare namespace NodeJS {
    interface Global {
      mongoose: {
        conn: unknown;
        promise: unknown;
      };
    }
  }
  