import bcrypt from 'bcryptjs'
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "./prismaDB";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Jhondoe" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },

      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email or password");
        }

        // check to see if user already exist
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if user was not found
        if (!user || !user?.password) {
          throw new Error("Invalid Login");
        }

        // check to see if passwords match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        // console.log(passwordMatch);

        if (!passwordMatch) {
          console.log("test", passwordMatch);
          throw new Error("Invalid Login");
        }

        return user;
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id ?? undefined;
        token.level = user.level ?? 1;
        token.xp = user.xp ?? 0;
        token.isAdmin = (user as any).isAdmin ?? false;
      }
      return token;
    },
    
  
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin ?? false;
        session.user.level = token.level ?? 1;
        session.user.xp = token.xp ?? 0;
      }
      return session;
    },
  },
  
  

  // debug: process.env.NODE_ENV === "developement",
};
