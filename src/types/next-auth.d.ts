// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      xp: number;
      level: number;
    };
  }

  interface User {
    id: string;
    isAdmin?: boolean;
    xp: number;
    level: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    xp: number;
    level: number;
  }
}
