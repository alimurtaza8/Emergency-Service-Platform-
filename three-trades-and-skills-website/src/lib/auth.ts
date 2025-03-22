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
      cookies().set('admin_session', 'mock_token_value', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}

export async function logout() {
  cookies().delete('admin_session');
}

export async function checkAuth() {
  const session = cookies().get('admin_session');
  
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