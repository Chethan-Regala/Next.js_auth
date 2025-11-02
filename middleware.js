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
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'admin') {
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
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'student') {
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
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'consumer') {
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin_dashboard/:path*', '/student_dashboard/:path*', '/consumer/:path*'],
};
