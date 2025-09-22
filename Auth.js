import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy auth
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
  callbacks: {
    authorized: ({ auth }) => !!auth,
  },
  pages: {
    signIn: "/login",
  },
});
