// import { NextRequest, NextResponse } from 'next/server';
// import { getCanisterClient } from '@/lib/canister';

// export async function GET(request: NextRequest) {
//   try {
//     // Check if canister ID is configured
//     const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
    
//     if (canisterId) {
//       // Use the canister client if available
//       try {
//         const client = getCanisterClient();
//         const stats = await client.getSystemStats();
        
//         return NextResponse.json({
//           success: true,
//           stats: stats,
//         });
//       } catch (error) {
//         console.error('Error calling canister:', error);
//         // Fall back to mock data if canister call fails
//       }
//     }
    
//     // For demo purposes or if canister is not available, return mock data
//     console.log('Using mock data for system stats');
    
//     const mockStats = {
//       totalUsers: 247,
//       totalServiceProviders: 58,
//       totalEmergencyCalls: 326,
//       activeEmergencyCalls: 12,
//       totalPayments: 280,
//     };
    
//     return NextResponse.json({
//       success: true,
//       stats: mockStats,
//     });
    
//   } catch (error) {
//     console.error('System stats API error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch system statistics' },
//       { status: 500 }
//     );
//   }
// } 



import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from GET" });
}
