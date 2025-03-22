// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login';
  
  // Check if path starts with /admin
  const isAdminPath = path.startsWith('/admin');
  
  // Get the token from the request cookies
  const token = request.cookies.get('admin_session')?.value || '';
  
  // If the path is an admin path (except for login) and there's no token,
  // redirect to the login page
  if (isAdminPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // If the user is already logged in and tries to access the login page,
  // redirect to the dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/admin/:path*']
};



// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const adminToken = request.cookies.get('admin_token');
//   const url = request.nextUrl.clone();
  
//   // Determine if the request is for an admin page (exclude login page and API routes)
//   const isAdminRoute = url.pathname.startsWith('/admin');
//   const isLoginPage = url.pathname === '/admin/login';
//   const isApiRoute = url.pathname.startsWith('/api/');
  
//   // If trying to access admin routes without authentication
//   if (isAdminRoute && !isLoginPage && !adminToken) {
//     url.pathname = '/admin/login';
//     return NextResponse.redirect(url);
//   }
  
//   // If already authenticated and trying to access login page
//   if (isLoginPage && adminToken) {
//     url.pathname = '/admin/dashboard';
//     return NextResponse.redirect(url);
//   }
  
//   return NextResponse.next();
// }

// // Configure which routes should be protected by this middleware
// export const config = {
//   matcher: ['/admin/:path*', '/api/admin/:path*'],
// };



// new code

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Get the pathname from the URL
//   const { pathname } = request.nextUrl;
  
//   // Specifically exclude the login page and API routes from protection
//   if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
//     return NextResponse.next();
//   }
  
//   // Check for admin token only on other admin routes
//   if (pathname.startsWith('/admin/')) {
//     const token = request.cookies.get('admin_token')?.value;
    
//     if (!token) {
//       // Redirect to login without creating a loop
//       const url = new URL('/admin/login', request.url);
//       url.searchParams.set('from', pathname);
//       return NextResponse.redirect(url);
//     }
//   }
  
//   return NextResponse.next();
// }

// // Only match admin routes, explicitly excluding login and API
// export const config = {
//   matcher: ['/admin/:path*']
// };