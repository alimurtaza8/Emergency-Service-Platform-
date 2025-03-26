// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function GET() {
//   const adminToken = cookies().get('admin_token');
  
//   return NextResponse.json({
//     authenticated: !!adminToken
//   });
// }






////////////////////////////


import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // const adminToken = cookies().get('admin_token');
  const adminToken = cookies().get('admin_session');
  
  return NextResponse.json({
    authenticated: !!adminToken
  });
}