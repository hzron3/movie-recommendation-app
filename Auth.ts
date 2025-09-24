// app/Auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        if (
          credentials.email === "savannahinformatics@example.com" &&
          credentials.password === "password"
        ) {
          return {
            id: "1",
            name: "John",
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ auth }: { auth: any }) => !!auth,
  },
  pages: {
    signIn: "/login",
  },
});
