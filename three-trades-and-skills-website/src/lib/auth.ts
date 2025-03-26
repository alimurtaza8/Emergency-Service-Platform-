// // src/lib/auth.ts
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getCanisterClient } from './canister';
// // Mock a principal for demo purposes, avoiding the import
// // import { Principal } from '@dfinity/principal';

// // Define a Principal interface that matches the expected shape
// interface PrincipalLike {
//   toString(): string;
//   // Add any other methods from Principal that we might need
// }

// // User type for session data
// export interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   isAdmin?: boolean;
// }

// // Mock principal ID for demonstration purposes
// // In production, this would come from dfinity/principal's Principal.fromText()
// const MOCK_PRINCIPAL_ID = 'rwlgt-iiaaa-aaaaa-aaaaa-cai';

// // The session cookie name
// const SESSION_COOKIE_NAME = 'user_session';

// // Admin principal IDs - replace with your actual admin IDs in production
// const ADMIN_PRINCIPALS = ['rwlgt-iiaaa-aaaaa-aaaaa-cai', 'aaaaa-bbbbb-ccccc-ddddd-eeeee'];

// // Login function
// export async function login(username: string, password: string): Promise<boolean> {
//   // In a real implementation, validate credentials with backend
//   if (username === 'demo@gmail.com' && password === 'password') {
//     // Create a session cookie with the principal ID
//     const cookieStore = cookies();
//     cookieStore.set(SESSION_COOKIE_NAME, MOCK_PRINCIPAL_ID, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: '/',
//       });
//     return true;
//   }
//   return false;
// }

// // Logout function
// export function logout(): void {
//   const cookieStore = cookies();
//   cookieStore.delete(SESSION_COOKIE_NAME);
// }

// // Get the current user's info - synchronous version for API routes
// export function getCurrentUser(cookieStore = cookies()): User | null {
//   const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
//   if (!sessionCookie) {
//     return null;
//   }
  
//   // Get the principal ID
//   const principalId = sessionCookie.value;

//   // Determine if user is admin
//   const isAdmin = ADMIN_PRINCIPALS.includes(principalId);
  
//   // Create a user object with minimal information
//   // Full profile would be fetched from canister as needed
//   return {
//     id: principalId,
//     isAdmin,
//   };
// }

// // Async version of getCurrentUser that can fetch additional profile data
// export async function getUserProfile(): Promise<User | null> {
//   const user = getCurrentUser();
//   if (!user) {
//     return null;
//   }
  
//   // Try to get additional profile data from canister
//   if (process.env.NEXT_PUBLIC_CANISTER_ID) {
//     try {
//       const client = getCanisterClient();
//       const profile = await client.getUserProfile(user.id);
      
//       if (profile) {
//         return {
//           ...user,
//           name: profile.name,
//           email: profile.email,
//         };
//       }
//     } catch (error) {
//       console.error('Error fetching user profile from canister:', error);
//       // Continue with basic user info if canister is unavailable
//     }
//   }
  
//   return user;
// }

// // Check if the current user is an admin
// export function isAdmin(): boolean {
//   const user = getCurrentUser();
//   return !!user?.isAdmin;
// }

// export function checkAuth() {
//   const adminSession = cookies().get('admin_session');
//   const user = getCurrentUser();
  
//   if (adminSession?.value) {
//     return { authenticated: true, isAdmin: true };
//   }
  
//   if (user) {
//     return { authenticated: true, isAdmin: user.isAdmin };
//   }
  
//   return { authenticated: false, isAdmin: false };
// }

// export function requireAuth() {
//   const { authenticated } = checkAuth();
  
//   if (!authenticated) {
//     redirect('/login');
//   }
// }

// export function requireAdminAuth() {
//   const { authenticated, isAdmin } = checkAuth();
  
//   if (!authenticated || !isAdmin) {
//     redirect('/admin/login');
//   }
// }


// export function validateToken(token: string | undefined): boolean {
//   // More robust token validation
//   if (!token) return false;

//   // Example validation logic (replace with your actual validation)
//   const isValidFormat = token.startsWith('admin_');
//   const isNotExpired = true; // Add actual expiration check

//   console.log('Token Validation:');
//   console.log('Token Format Valid:', isValidFormat);
//   console.log('Token Not Expired:', isNotExpired);

//   return isValidFormat && isNotExpired;
// }







// // src/lib/auth.ts
// export function generateSecureToken(): string {
//   return `admin_${Date.now()}_${Math.random().toString(36).substring(2)}`;
// }

// export function validateAdminCredentials(email: string, password: string): boolean {
//   // Replace with your actual authentication logic
//   const ADMIN_EMAIL = 'admin@example.com';
//   const ADMIN_PASSWORD = 'adminpassword123';
  
//   return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
// }













////////////////////////////////////////////////////


// src/lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// This would connect to your Motoko backend in production
export async function login(email: string, password: string) {
  try {
    // In production, this would call your ICP canister to authenticate
    // For now, we're using a mock authentication
    if (email === 'admin@example.com' && password === 'securepassword') {
      // Set secure, HttpOnly cookie
      // cookies().set('admin_session', 'mock_token_value', {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 60 * 60 * 24, // 1 day
      //   path: '/',
      // });

      cookies().set('admin_session', 'mock_token_value', { // Consistent name
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch  {
    return { success: false, error: 'Authentication failed' };
  }
}

export async function logout() {
  cookies().delete('admin_session');
}

export async function checkAuth() {
  // const session = cookies().get('admin_session');
  const session = cookies().get('admin_session'); // Consistent name
  
  // In production, verify the token with your backend
  if (!session?.value) {
    return false;
  }
  
  return true;
}

export async function requireAuth() {
  const isAuthenticated = await checkAuth();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}