// import { NextRequest, NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/auth';
// import { getCanisterClient } from '@/lib/canister';

// export async function GET(request: NextRequest) {
//   try {
//     // Get the current user
//     const user = await getCurrentUser();
    
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     try {
//       // Check if canister ID is configured
//       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
      
//       if (canisterId) {
//         // Use the canister client if available
//         try {
//           const client = getCanisterClient();
//           const paymentMethods = await client.getUserPaymentMethods(user);
          
//           return NextResponse.json({
//             success: true,
//             paymentMethods,
//           });
//         } catch (error) {
//           console.error('Error calling canister:', error);
//           // Fall back to mock data if canister call fails
//         }
//       }
      
//       // For demo purposes or if canister is not available, return mock data
//       console.log('Using mock data for payment methods');
      
//       const mockPaymentMethods = [
//         {
//           cardType: 'Visa',
//           lastFourDigits: '4242',
//           tokenId: 'tok_visa_mock',
//         },
//         {
//           cardType: 'Mastercard',
//           lastFourDigits: '5556',
//           tokenId: 'tok_mastercard_mock',
//         }
//       ];
      
//       return NextResponse.json({
//         success: true,
//         paymentMethods: mockPaymentMethods,
//       });
      
//     } catch (error) {
//       console.error('Error processing payment methods request:', error);
//       return NextResponse.json(
//         { success: false, error: 'Failed to fetch payment methods' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Payment methods API error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     // Get the current user
//     const user = await getCurrentUser();
    
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     // Parse request body
//     const body = await request.json();
//     const { cardType, lastFourDigits, tokenId } = body;
    
//     // Validate required fields
//     if (!cardType || !lastFourDigits || !tokenId) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment method fields' },
//         { status: 400 }
//       );
//     }
    
//     const paymentMethod = {
//       cardType,
//       lastFourDigits,
//       tokenId
//     };
    
//     try {
//       // Check if canister ID is configured
//       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
      
//       if (canisterId) {
//         // Use the canister client if available
//         try {
//           const client = getCanisterClient();
//           const result = await client.addPaymentMethod(user, paymentMethod);
          
//           if (result) {
//             return NextResponse.json({
//               success: true,
//               message: 'Payment method added successfully',
//             });
//           } else {
//             return NextResponse.json(
//               { success: false, error: 'Failed to add payment method' },
//               { status: 500 }
//             );
//           }
//         } catch (error) {
//           console.error('Error calling canister:', error);
//           // Fall back to mock response if canister call fails
//         }
//       }
      
//       // For demo purposes or if canister is not available, simulate success
//       console.log('Using mock response for adding payment method');
      
//       return NextResponse.json({
//         success: true,
//         message: 'Payment method added successfully (MOCK)',
//       });
      
//     } catch (error) {
//       console.error('Error processing payment method addition:', error);
//       return NextResponse.json(
//         { success: false, error: 'Failed to add payment method' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Payment method API error:', error);
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
