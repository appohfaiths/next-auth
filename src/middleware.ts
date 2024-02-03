import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { Token } from "next-auth";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const url = request.nextUrl.clone();

    if (
      request.nextUrl.pathname === "/" &&
      (request?.nextauth?.token as unknown as Token)
    ) {
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (token || req.nextUrl.pathname === "/") {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/contact", "/about"],
};