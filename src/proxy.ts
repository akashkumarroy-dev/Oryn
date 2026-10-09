import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/signin',
  '/terms',
  '/privacy',
  '/sso-callback',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const { userId } = await auth();
    if (!userId) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('redirect_url', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isPublicRoute(request) && request.nextUrl.pathname === '/signin') {
    const { userId } = await auth();
    if (userId) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};