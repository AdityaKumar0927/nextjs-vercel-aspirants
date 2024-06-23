import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const protectedRoutes = ['/protected', '/api/protected'];

const customMiddleware = async (req: NextRequest) => {
  const sessionToken = req.cookies.get('session'); // Use cookies to retrieve the session token
  if (!sessionToken && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    const url = req.nextUrl.clone();
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }

  return req;
};

export default async function middleware(req: NextRequest) {
  const result = await customMiddleware(req);
  if (result instanceof NextResponse) {
    return result;
  }
  return middleware(req);
}

export const config = {
  matcher: ['/protected/:path*', '/api/protected/:path*'],
};
