import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isAuthPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/forgot-password" || path === "/resetpassword";

  const isRootPath = path === "/";
  
  const token = request.cookies.get('token')?.value || '';


  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl)); 
  }

 
  if (!isAuthPath && !isRootPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgot-password',
    '/resetpassword',
  ],
};
