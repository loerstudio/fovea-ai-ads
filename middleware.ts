import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/campaigns(.*)',
  '/analytics(.*)',
  '/settings(.*)',
  '/api/protected(.*)',
]);

// Demo mode se Clerk non configurato
const middleware = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? function middleware() {
      console.log('⚠️ Clerk not configured, auth disabled for demo');
      return NextResponse.next();
    }
  : clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
    });

export default middleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};