// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { getCanisterClient } from '@/lib/canister';
// import { getCurrentUser } from '@/lib/auth';

// export async function GET(request: NextRequest) {
//   try {
//     // Check for authenticated user
//     const user = getCurrentUser(cookies());
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }
    
//     // Basic user info from cookie/session
//     const userResponse = {
//       user: {
//         name: user.name || 'User',
//         email: user.email || '',
//         id: user.id || '',
//       },
//       canisterProfile: null,
//     };
    
//     // Try to fetch user profile from canister if available
//     if (process.env.NEXT_PUBLIC_CANISTER_ID) {
//       try {
//         const client = getCanisterClient();
//         const canisterProfile = await client.getUserProfile(user.id);
        
//         if (canisterProfile) {
//           userResponse.canisterProfile = canisterProfile;
//           console.log('Successfully fetched user profile from canister');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile from canister:', error);
//         // Continue with basic user info if canister is unavailable
//       }
//     } else {
//       // If no canister ID is configured, create a mock profile for development
//       userResponse.canisterProfile = {
//         id: user.id,
//         name: user.name || 'Test User',
//         email: user.email || 'user@example.com',
//         phone: '(555) 123-4567',
//         address: '123 Main St, Anytown, USA',
//         membershipTier: { 'Standard': null },
//         paymentMethods: [
//           {
//             cardType: 'Visa',
//             lastFourDigits: '4242',
//             tokenId: 'mock_token_123',
//           }
//         ],
//         registrationDate: Date.now(),
//         lastUpdated: Date.now(),
//       };
//     }
    
//     return NextResponse.json(userResponse);
//   } catch (error) {
//     console.error('Error in user profile API:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch user profile' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: NextRequest) {
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
//     const { name, email, phone, address, membershipTier } = body;
    
//     // Create update object with only fields provided
//     const updateData: Record<string, any> = {};
//     if (name !== undefined) updateData.name = name;
//     if (email !== undefined) updateData.email = email;
//     if (phone !== undefined) updateData.phone = phone;
//     if (address !== undefined) updateData.address = address;
//     if (membershipTier !== undefined) updateData.membershipTier = membershipTier;
    
//     try {
//       // Check if canister ID is configured
//       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
      
//       if (canisterId) {
//         // Use the canister client if available
//         try {
//           const client = getCanisterClient();
//           const result = await client.updateUserProfile(user, updateData);
          
//           if (result) {
//             return NextResponse.json({
//               success: true,
//               message: 'Profile updated successfully',
//             });
//           } else {
//             return NextResponse.json(
//               { success: false, error: 'Failed to update profile' },
//               { status: 500 }
//             );
//           }
//         } catch (error) {
//           console.error('Error calling canister:', error);
//           // Fall back to mock response if canister call fails
//         }
//       }
      
//       // For demo purposes or if canister is not available, simulate success
//       console.log('Using mock response for profile update');
      
//       return NextResponse.json({
//         success: true,
//         message: 'Profile updated successfully (MOCK)',
//       });
      
//     } catch (error) {
//       console.error('Error processing profile update:', error);
//       return NextResponse.json(
//         { success: false, error: 'Failed to update profile' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Profile update API error:', error);
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
