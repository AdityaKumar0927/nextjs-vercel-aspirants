import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import createIntlMiddleware from 'next-intl/middleware'; // Adjusted import based on common practices

const protectedRoutes = ['/protected', '/api/protected'];

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr', 'de', 'es', 'ja', 'ru', 'fa', 'ar'],
  defaultLocale: 'en',
});

const customMiddleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
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
  return intlMiddleware(result);
}

export const config = {
  matcher: ['/protected/:path*', '/api/protected/:path*'],
};
