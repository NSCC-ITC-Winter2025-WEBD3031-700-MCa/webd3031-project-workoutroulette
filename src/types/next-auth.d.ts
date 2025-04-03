// types/next-auth.d.ts or wherever you defined it

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean | null
    }
  }

  interface User {
    id?: string | null
    isAdmin?: boolean | null 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null
    isAdmin?: boolean | null
  }
}
