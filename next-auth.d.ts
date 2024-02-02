import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
    scheme: string;
    expiry: number;
    user: any;
  }

  interface Token {
    sub: string;
  }

  interface Session {
    user: User;
  }
}