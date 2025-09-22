import { auth } from "./Auth";

export { auth as middleware };

export const config = {
  matcher: ["/movie/:path*"],
};
