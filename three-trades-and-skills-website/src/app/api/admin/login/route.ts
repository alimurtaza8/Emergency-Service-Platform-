// src/app/api/admin/login/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { login } from '@/lib/auth';

// export async function POST(request: NextRequest) {
//   try {
//     const { email, password } = await request.json();
    
//     if (!email || !password) {
//       return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
//     }
    
//     const result = await login(email, password);
    
//     if (result.success) {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ success: false, error: result.error }, { status: 401 });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }


// // src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Replace with your actual authentication logic
    // This is a simplified example
    if (email === 'admin@example.com' && password === 'adminpassword123') {
      // Set a secure HTTP-only cookie for authentication
      cookies().set({
        name: 'admin_token',
        value: 'your-secure-token-value',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'An error occurred during login' });
  }
}



////////////////////


// src/app/api/admin/login/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// // Default admin credentials for testing
// // In production, this should be replaced with proper authentication
// const ADMIN_EMAIL = 'admin@example.com';
// const ADMIN_PASSWORD = 'admin123';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     // Basic authentication check
//     // Replace this with your actual authentication logic
//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//       // Set a secure HTTP-only cookie
//       cookies().set({
//         name: 'admin_token',
//         value: 'secure-token-value',
//         httpOnly: true,
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24, // 1 day
//       });
      
//       return NextResponse.json({ 
//         success: true,
//         message: 'Authentication successful' 
//       });
//     } else {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Invalid email or password' 
//       }, { status: 401 });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ 
//       success: false, 
//       error: 'An error occurred during login' 
//     }, { status: 500 });
//   }
// }