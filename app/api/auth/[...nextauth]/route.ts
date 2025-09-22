// app/api/auth/[...nextauth]/route.ts
import { handlers } from "Auth";
import { NextRequest } from "next/server";

export const { GET, POST } = handlers;
