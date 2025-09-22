// app/api/auth/[...nextauth]/route.ts
import { handlers } from "Auth";
import { NextRequest } from "next/server";

export const { GET, POST } = handlers;

// export async function GET(request: NextRequest) {
//   return handlers.GET(request);
// }

// export async function POST(request: NextRequest) {
//   return handlers.POST(request);
// }
