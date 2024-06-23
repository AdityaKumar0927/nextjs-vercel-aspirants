// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/protected', '/api/protected'];

const customMiddleware = async (req: NextRequest) => {
  const sessionToken = req.cookies.get('session');
  if (!sessionToken && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    const url = req.nextUrl.clone();
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }

  return req;
};

export default async function middleware(req: NextRequest) {
  const result = await customMiddleware(req);
  return result instanceof NextResponse ? result : NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/api/protected/:path*'],
};
