// // src/app/api/admin/login/route.ts
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
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     // Replace with your actual authentication logic
//     // This is a simplified example
//     if (email === 'admin@example.com' && password === 'adminpassword123') {
//       // Set a secure HTTP-only cookie for authentication
//       cookies().set({
//         name: 'admin_token',
//         value: 'your-secure-token-value',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//       });
      
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ success: false, error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ success: false, error: 'An error occurred during login' });
//   }
// }



////////////////////


// // src/app/api/admin/login/route.ts
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












//////////////////////////////////////////////////////


// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     // Debugging and Improvement Recommendations:
//     console.log('Login attempt:', { email }); // Log email (without password for security)
    
//     // More robust authentication
//     if (email === 'admin@example.com' && password === 'adminpassword123') {
//       // Enhanced token generation
//       const token = generateSecureToken(); 
      
//       // More comprehensive cookie setting
//       cookies().set({
//         name: 'admin_token',
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict', // Added for additional security
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//       });
      
//       return NextResponse.json({ 
//         success: true, 
//         redirect: '/dashboard' // Explicitly include redirect information
//       });
//     } else {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Invalid credentials',
//         message: 'Please check your email and password'
//       });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ 
//       success: false, 
//       error: 'An error occurred during login',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// // Utility function for token generation
// function generateSecureToken(): string {
//   return Math.random().toString(36).substring(2) + Date.now().toString(36);
// }











/////////////////////////////


// // src/app/api/admin/login/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     // Replace with your actual authentication logic
//     if (email === 'admin@example.com' && password === 'adminpassword123') {
//       // Generate a secure token (replace with a more robust method in production)
//       const token = `admin_${Math.random().toString(36).substring(2)}`;
      
//       // Set a secure HTTP-only cookie
//       cookies().set({
//         name: 'admin_token',
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//       });
      
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Invalid email or password' 
//       });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ 
//       success: false, 
//       error: 'An error occurred during login' 
//     });
//   }
// }














///////////////////////////



// // src/app/api/admin/login/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/server';
// import { generateSecureToken, validateAdminCredentials } from '@/lib/auth';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     if (validateAdminCredentials(email, password)) {
//       const token = generateSecureToken();
      
//       // More secure cookie setting
//       const response = NextResponse.json({ 
//         success: true,
//         redirectUrl: '/admin/dashboard'
//       });

//       response.cookies.set({
//         name: 'admin_token',
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//         maxAge: 60 * 60 * 24 // 24 hours
//       });

//       return response;
//     } else {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Invalid credentials' 
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







/////////////////////////////////////////////


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
      // cookies().set({
      //   name: 'admin_token',
      //   value: 'your-secure-token-value',
      cookies().set({
        name: 'admin_session',  // Changed from admin_token
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
