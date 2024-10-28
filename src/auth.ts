import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db";

// Extract the client id and secret from the environment variables
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// types of extracted variables can be undefined, so we need to verify them
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('GITHUB_CLIENT_ID and GITUB_CLIENT_SECRET must be provided');
}

// Extract lots of utilities from NextAuth, we will use them in our entire application
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), // We use PrismaAdapter to let next-auth use prisma as the database
  providers: [
    GitHub({   // We use Github provider for authentication, so here we need to provide the client id and secret
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  // Usually not needed, here we just fix a bug in next-auth
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;  // so the bug is that session.user.id is not set, so we set it here
      }

      return session;
    }
  },
  trustHost: true,
})
