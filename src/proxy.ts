import { auth } from "@/auth";

export default auth;

export const config = {
  // Protect all routes under /dashboard
  matcher: ["/dashboard/:path*"],
};
