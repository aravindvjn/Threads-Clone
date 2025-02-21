'use server'
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

export async function middleware(req: NextRequest) {
  console.log('Middleware is running');

  const token = req.cookies.get('session_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const userId = payload.userId;
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('user-id', userId as string);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.log('Invalid token:', error);
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!auth$|auth/register$|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
