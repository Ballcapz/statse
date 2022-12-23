import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prismadb";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, token, user }: any) {
      session.user = {
        ...user,
        id: user.id,
      };
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      user && (token.user = user);
      return token;
    },
  },
};
export default NextAuth(authOptions);
