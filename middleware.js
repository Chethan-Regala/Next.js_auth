import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Middleware for role-based route protection.
 * Protects admin and student dashboards with proper role validation.
 */
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // Admin Dashboard Protection
  if (pathname.startsWith('/admin_dashboard')) {
    if (!token) {
      console.log('[MIDDLEWARE] Unauthenticated user tried to access admin dashboard. Redirecting to /signin.');
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'admin') {
      console.log(`[MIDDLEWARE] User with role ${token.role} tried to access admin dashboard. Redirecting.`);
      if (token.role === 'student') {
        url.pathname = '/student_dashboard';
      } else {
        url.pathname = '/signin';
      }
      return NextResponse.redirect(url);
    }
  }

  // Student Dashboard Protection
  if (pathname.startsWith('/student_dashboard')) {
    if (!token) {
      console.log('[MIDDLEWARE] Unauthenticated user tried to access student dashboard. Redirecting to /signin.');
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'student') {
      console.log(`[MIDDLEWARE] User with role ${token.role} tried to access student dashboard. Redirecting.`);
      if (token.role === 'admin') {
        url.pathname = '/admin_dashboard';
      } else {
        url.pathname = '/signin';
      }
      return NextResponse.redirect(url);
    }
  }

  // Consumer Dashboard Protection (existing)
  if (pathname.startsWith('/consumer')) {
    if (!token) {
      console.log('[MIDDLEWARE] Unauthenticated user tried to access consumer dashboard. Redirecting to /signin.');
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'consumer') {
      console.log(`[MIDDLEWARE] User with role ${token.role} tried to access consumer dashboard. Redirecting.`);
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin_dashboard/:path*', '/student_dashboard/:path*', '/consumer/:path*'],
};
