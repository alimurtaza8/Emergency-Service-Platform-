// // // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Get the pathname of the request
//   const path = request.nextUrl.pathname;
  
//   // Define public paths that don't require authentication
//   const isPublicPath = path === '/admin/login';
  
//   // Check if path starts with /admin
//   const isAdminPath = path.startsWith('/admin/dashboard');
  
//   // Get the token from the request cookies
//   const token = request.cookies.get('admin_session')?.value || '';
  
//   // If the path is an admin path (except for login) and there's no token,
//   // redirect to the login page
//   if (isAdminPath && !isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/admin/login', request.url));
//   }
  
//   // If the user is already logged in and tries to access the login page,
//   // redirect to the dashboard
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//   }
  
//   return NextResponse.next();
// }

// // Configure the middleware to run on specific paths
// export const config = {
//   matcher: ['/admin/dashboard/:path*']
// };



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










/////////////////////////////



// src/middleware.ts (New middleware for authentication)
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const adminToken = request.cookies.get('admin_token');

//   // Check if trying to access admin routes
//   if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
//     if (!adminToken) {
//       // Redirect to login if no token
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//   }

//   // Continue request if authenticated or not an admin route
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/dashboard/:path*']
// }




// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const adminToken = request.cookies.get('admin_token');

//   // Debugging middleware
//   console.log('Middleware Checks:');
//   console.log('Current Path:', request.nextUrl.pathname);
//   console.log('Admin Token Present:', !!adminToken);

//   // Enhanced route protection
//   if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
//     if (!adminToken) {
//       console.log('No token: Redirecting to login');
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/dashboard']
// }



// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const adminToken = request.cookies.get('admin_token');

//   // Strict authentication check for dashboard routes
//   if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
//     if (!adminToken || !isValidToken(adminToken.value)) {
//       console.log('Middleware: Redirecting to login due to invalid token');
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }


// // Token validation function
// function isValidToken(token: string): boolean {
//   // Implement more robust token validation
//   return token.startsWith('admin_') && token.length > 10;
// }

// export const config = {
//   matcher: ['/admin/dashboard']
// }









//////////////////////////////////////////////////////////


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
  // const token = request.cookies.get('admin_session')?.value || '';
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