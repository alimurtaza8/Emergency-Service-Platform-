// import { NextRequest, NextResponse } from 'next/server';
// import { getCanisterClient } from '@/lib/canister';
// // Use a type-only import for MembershipTier only
// import type { MembershipTier, PaymentMethod } from '@/lib/canister';
// import { cookies } from 'next/headers';

// // Mock principal for testing without the actual canister
// const MOCK_PRINCIPAL = 'rrkah-fqaaa-aaaaa-aaaaq-cai';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, email, phone, address, membershipTier, paymentMethod } = body;

//     // Basic validation
//     if (!name || !email || !phone || !address || !membershipTier) {
//       return NextResponse.json(
//         { success: false, error: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Initialize canister client
//     try {
//       // Create a membership tier variant for the canister
//       // Use a type assertion to ensure type safety
//       const tierVariant = { [membershipTier]: null } as MembershipTier;
      
//       // Prepare user profile for canister
//       const userProfile = {
//         name,
//         email,
//         phone,
//         address,
//         membershipTier: tierVariant,
//         paymentMethods: [],
//       };
      
//       let principalId = MOCK_PRINCIPAL;
      
//       // Try to connect to the canister if we have the environment variables set up
//       if (process.env.NEXT_PUBLIC_CANISTER_ID) {
//         try {
//           const client = getCanisterClient();
          
//           // Create user in the canister
//           principalId = await client.createUser(userProfile);
          
//           // If payment method was provided, register it with the canister
//           if (paymentMethod) {
//             await client.addPaymentMethod(principalId, paymentMethod as PaymentMethod);
//             console.log('Successfully registered payment method with canister');
//           }
          
//           console.log('Successfully created user in canister:', principalId);
//         } catch (error) {
//           console.error('Canister operation failed:', error);
//           // Fall back to mock if canister not available
//           console.log('Falling back to mock principal');
//           // In a production environment, you might want to return an error instead
//           // return NextResponse.json(
//           //   { success: false, error: 'Canister backend unavailable' },
//           //   { status: 503 }
//           // );
//         }
//       } else {
//         // Log mock operation for development
//         console.log('Using mock principal (canister ID not configured)');
        
//         // Mock payment method registration
//         if (paymentMethod) {
//           console.log('Mock register payment method:', paymentMethod);
//         }
//       }
      
//       // Set the user session cookie
//       cookies().set('user_session', principalId, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24, // 1 day
//         path: '/',
//       });

//       return NextResponse.json({
//         success: true,
//         principalId,
//       });
//     } catch (error) {
//       console.error('Canister registration error:', error);
//       return NextResponse.json(
//         { success: false, error: 'Failed to register user with the backend' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Registration API error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// } 







import { logout } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 