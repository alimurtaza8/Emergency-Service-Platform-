// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
// import { cookies } from 'next/server';
// import { Cookies } from 'lucide-react';
import { cookies } from 'next/headers'; 

export async function GET() {
  const adminToken = cookies().get('admin_token')?.value;

  // Implement more robust token validation
  const isAuthenticated = adminToken && 
    adminToken.startsWith('admin_') && 
    adminToken.length > 10;

  return NextResponse.json({ 
    isAuthenticated,
    message: isAuthenticated ? 'Authenticated' : 'Not Authenticated'
  });
}