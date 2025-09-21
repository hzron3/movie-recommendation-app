"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <button
      onClick={() => (session ? signOut() : signIn("google"))}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      {session ? `Sign Out (${session.user.name})` : "Sign In with Google"}
    </button>
  );
}
