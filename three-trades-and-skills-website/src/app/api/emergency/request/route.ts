// import { NextRequest, NextResponse } from 'next/server';
// // import { getCurrentUser } from '@/lib/auth';
// import { getCanisterClient } from '@/lib/canister';

// export async function POST(request: NextRequest) {
//   try {
//     // Get the current user
//     // const user = await getCurrentUser();
//     const user = "text";
    
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     // Parse request body
//     const body = await request.json();
//     const { serviceType, description, location } = body;
    
//     // Validate required fields
//     if (!serviceType || !description || !location) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Validate location
//     if (!location.latitude || !location.longitude || !location.address) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid location data' },
//         { status: 400 }
//       );
//     }
    
//     try {
//       // Check if canister ID is configured
//       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
      
//       // if (canisterId) {
//         // Use the canister client if available
//         // try {
//           const client = getCanisterClient();
//           // const result = await client.initiateEmergencyCall(
//           //   user,
//           //   serviceType,
//           //   description,
//           //   location
//           // );
//           const result = "ok";
          
//         //   if ('ok' in result) {
//         //     return NextResponse.json({
//         //       success: true,
//         //       callId: result.ok,
//         //       message: 'Emergency service request submitted successfully',
//         //     });
//         //   } else {
//         //     return NextResponse.json(
//         //       { success: false, error: `Canister error: ${result.err}` },
//         //       { status: 500 }
//         //     );
//         //   }
//         // } catch (error) {
//         //   console.error('Error calling canister:', error);
//         //   // Fall back to mock data if canister call fails
//         // }
//       // }
      
//       // For demo purposes or if canister is not available, simulate a successful call
//       console.log('Using mock data for emergency call');
//       const callId = `ER-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
//       return NextResponse.json({
//         success: true,
//         callId: callId,
//         message: 'Emergency service request submitted successfully (MOCK)',
//       });
      
//     } catch (error) {
//       console.error('Error processing emergency request:', error);
//       return NextResponse.json(
//         { success: false, error: 'Failed to process emergency request' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Emergency request API error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// } 




import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from GET" });
}
