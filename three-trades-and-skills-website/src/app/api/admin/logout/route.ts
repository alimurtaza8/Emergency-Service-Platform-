import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().delete('admin_session');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Logout failed' 
    });
  }
}