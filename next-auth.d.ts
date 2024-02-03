import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
// import { Agency } from "./lib/types";

declare module "next-auth" {
  interface User {
    token: string;
    scheme: string;
    expiry: number;
    user: any;
  }

  interface Token {
    sub: string;
    agencyData: {
      name: string;
      privateKey: string;
      logoUrl: string;
    };
  }

  interface Session {
    user: User;
    // agencyData: Agency;
  }
}