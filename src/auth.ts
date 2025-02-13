import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('GITHUB_CLIENT_ID and GITUB_CLIENT_SECRET must be provided');
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), // We use PrismaAdapter to let next-auth use prisma as the database

  // TODO: need to add email/password login option
  // TODO: different providers with the same email will occur an error, need to do some handling about it
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ],
  // Usually not needed, here we just fix a bug in next-auth
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;  // so the bug is that session.user.id is not set, so we set it here
      }

      return session;
    },
  },
  trustHost: true,
})
