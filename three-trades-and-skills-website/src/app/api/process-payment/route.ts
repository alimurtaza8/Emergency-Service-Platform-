// import { NextRequest, NextResponse } from 'next/server';
// import { formatAmountForSquare } from '@/lib/square-payments';
// // Note: Need to install square dependency with npm install square
// // import { ApiError, Client, Environment } from 'square';
// import { SquareClient, SquareEnvironment, ApiError } from 'square';

// // Determine environment based on NODE_ENV
// // const environment = process.env.NODE_ENV === 'production' 
// //   ? Environment.Production 
// //   : Environment.Sandbox;

// const environment = process.env.NODE_ENV === 'production' 
//   ? SquareEnvironment.Production 
//   : SquareEnvironment.Sandbox;

// // Initialize Square client
// // const squareClient = new Client({
// //   accessToken: process.env.SQUARE_ACCESS_TOKEN,
// //   environment,
// // });
// const squareClient = new SquareClient({
//   token: process.env.SQUARE_ACCESS_TOKEN,
//   environment,
// });


// // Get payment API instance
// const paymentsApi = squareClient.paymentsApi;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName } = body;
    
//     // Validate request data
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' }, 
//         { status: 400 }
//       );
//     }
    
//     // Format idempotency key to prevent double-charging
//     const idempotencyKey = `${planId}_${Date.now()}`;
    
//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);
    
//     // If we're in test mode or missing Square credentials, return mock success
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }
    
//     try {
//       // Create payment with Square API
//       const paymentResponse = await paymentsApi.createPayment({
//         sourceId,
//         idempotencyKey,
//         amountMoney: {
//           amount: amountInCents,
//           currency: 'USD',
//         },
//         // Include metadata about the transaction
//         note: `Three Trades and Skills - ${planName} Subscription`,
//       });
      
//       // Log success for debugging
//       console.log('Payment success:', paymentResponse.result);
      
//       // Return success response
//       return NextResponse.json({
//         success: true,
//         payment: paymentResponse.result.payment,
//       });
//     } catch (error) {
//       // Handle Square API errors
//       if (error instanceof ApiError) {
//         console.error('Square API Error:', error.errors);
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: error.errors[0]?.detail || 'Payment processing failed' 
//           }, 
//           { status: 400 }
//         );
//       }
      
//       // Re-throw unexpected errors
//       throw error;
//     }
//   } catch (error: unknown) {
//     // Handle general errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Server error processing payment';
    
//     // Try to extract message if error is an object with a message property
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { success: false, error: errorMessage }, 
//       { status: 500 }
//     );
//   }
// } 




////////////////////////////////////////////////////////////////
// new code


// import { NextRequest, NextResponse } from 'next/server';
// import { formatAmountForSquare } from '@/lib/square-payments';
// // import { Client, Environment, ApiError } from 'square';
// // import { Client, Environment, Error } from 'square';
// import { SquareClient, SquareEnvironment, ApiError } from 'square';

// // Determine environment based on NODE_ENV
// const environment = process.env.NODE_ENV === 'production' 
//   ? SquareEnvironment.Production 
//   : SquareEnvironment.Sandbox;
  
// // Initialize Square client
// const squareClient = new SquareClient({
//   applicationId: process.env.SQUARE_ACCESS_TOKEN,
//   environment,
// });

// // Get payment API instance
// const paymentsApi = squareClient.paymentsApi;
// // const paymentsApi = squareClient.payments;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName } = body;
    
//     // Validate request data
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' }, 
//         { status: 400 }
//       );
//     }
    
//     // Format idempotency key to prevent double-charging
//     const idempotencyKey = `${planId}_${Date.now()}`;
    
//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);
    
//     // If we're in test mode or missing Square credentials, return mock success
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }
    
//     try {
//       // Create payment with Square API
//       const paymentResponse = await paymentsApi.createPayment({
//         sourceId,
//         idempotencyKey,
//         amountMoney: {
//           amount: amountInCents,
//           currency: 'USD',
//         },
//         // Include metadata about the transaction
//         note: `Three Trades and Skills - ${planName} Subscription`,
//       });
      
//       // Log success for debugging
//       console.log('Payment success:', paymentResponse.result);
      
//       // Return success response
//       return NextResponse.json({
//         success: true,
//         payment: paymentResponse.result.payment,
//       });
//     } catch (error) {
//       // Handle Square API errors
//       console.error('Square API Error:', error);
      
//       let errorMessage = 'Payment processing failed';
      
//       // Safely check if the error is from Square API
//       if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
//         errorMessage = error.errors[0]?.detail || errorMessage;
//       }
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: errorMessage 
//         }, 
//         { status: 400 }
//       );
//     }
//   } catch (error: unknown) {
//     // Handle general errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Server error processing payment';
    
//     // Try to extract message if error is an object with a message property
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { success: false, error: errorMessage }, 
//       { status: 500 }
//     );
//   }
// }




// ////////////////////////////////////////////////////////////////////


// import { NextRequest, NextResponse } from 'next/server';
// import { Client, Environment, ApiError } from 'square';
// import { formatAmountForSquare } from '@/lib/square-payments';

// // Determine environment based on NODE_ENV
// const environment = process.env.NODE_ENV === 'production' 
//   ? Environment.Production 
//   : Environment.Sandbox;
  
// // Initialize Square client
// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment,
// });

// // Get payment API instance
// const paymentsApi = squareClient.paymentsApi;

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;
    
//     // Validate request data
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' }, 
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }
    
//     // Format idempotency key to prevent double-charging
//     const idempotencyKey = `${planId}_${Date.now()}`;
    
//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);
    
//     // If we're in test mode or missing Square credentials, return mock success
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }
    
//     try {
//       // Create payment with Square API
//       const paymentResponse = await paymentsApi.createPayment({
//         sourceId,
//         idempotencyKey,
//         amountMoney: {
//           amount: amountInCents,
//           currency: 'USD',
//         },
//         buyerEmailAddress: userInfo.email,
//         // Include metadata about the transaction
//         note: `Subscription - ${planName}`,
//         // Include customer information in metadata
//         billingAddress: {
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           addressLine1: userInfo.address,
//           locality: userInfo.city,
//           country: userInfo.country,
//           postalCode: userInfo.postalCode,
//         },
//         // Add customer metadata
//         customerDetails: {
//           customerInitiated: true,
//           referenceId: userInfo.email
//         }
//       });
      
//       // Log success for debugging
//       console.log('Payment success:', paymentResponse.result);
      
//       // Return success response
//       return NextResponse.json({
//         success: true,
//         payment: paymentResponse.result.payment,
//       });
//     } catch (error) {
//       // Handle Square API errors
//       console.error('Square API Error:', error);
      
//       let errorMessage = 'Payment processing failed';
      
//       // Safely check if the error is from Square API
//       if (error instanceof ApiError && error.errors && error.errors.length > 0) {
//         errorMessage = error.errors[0]?.detail || errorMessage;
//       }
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: errorMessage 
//         }, 
//         { status: 400 }
//       );
//     }
//   } catch (error: unknown) {
//     // Handle general errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Server error processing payment';
    
//     // Try to extract message if error is an object with a message property
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { success: false, error: errorMessage }, 
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }




//  again new code man.......................................



// import { NextRequest, NextResponse } from 'next/server';
// // import { Client, Environment, ApiError } from 'square';
// import { Client , Environment,ApiError} from 'square';
// import { formatAmountForSquare } from '@/lib/square-payments';

// // Determine environment based on NODE_ENV
// const environment = process.env.NODE_ENV === 'production'
//   ? 'production'  // Use string literals instead of Environment enum
//   : 'sandbox';    // Use string literals instead of Environment enum
  
// // Initialize Square client
// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
//   environment: environment as 'sandbox' | 'production',
// });

// // Get payment API instance
// const paymentsApi = squareClient.paymentsApi;

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;
    
//     // Validate request data
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' }, 
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }
    
//     // Format idempotency key to prevent double-charging
//     const idempotencyKey = `${planId}_${Date.now()}`;
    
//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);
    
//     // If we're in test mode or missing Square credentials, return mock success
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }
    
//     try {
//       // Create payment with Square API
//       const paymentResponse = await paymentsApi.createPayment({
//         sourceId,
//         idempotencyKey,
//         amountMoney: {
//           amount: amountInCents,
//           currency: 'USD',
//         },
//         buyerEmailAddress: userInfo.email,
//         // Include metadata about the transaction
//         note: `Subscription - ${planName}`,
//         // Include customer information in metadata
//         billingAddress: {
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           addressLine1: userInfo.address,
//           locality: userInfo.city,
//           country: userInfo.country,
//           postalCode: userInfo.postalCode,
//         },
//         // Add customer metadata
//         customerDetails: {
//           customerInitiated: true,
//           referenceId: userInfo.email
//         }
//       });
      
//       // Log success for debugging
//       console.log('Payment success:', paymentResponse.result);
      
//       // Return success response
//       return NextResponse.json({
//         success: true,
//         payment: paymentResponse.result.payment,
//       });
//     } catch (squareError) {
//       // Handle Square API errors
//       console.error('Square API Error:', squareError);
      
//       let errorMessage = 'Payment processing failed';
      
//       // Safely check if the error is from Square API
//       if (
//         squareError && 
//         typeof squareError === 'object' && 
//         'errors' in squareError && 
//         Array.isArray((squareError as ApiError).errors) && 
//         (squareError as ApiError).errors.length > 0
//       ) {
//         const apiError = squareError as ApiError;
//         errorMessage = apiError.errors[0]?.detail || errorMessage;
//       }
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: errorMessage 
//         }, 
//         { status: 400 }
//       );
//     }
//   } catch (error: unknown) {
//     // Handle general errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Server error processing payment';
    
//     // Try to extract message if error is an object with a message property
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { success: false, error: errorMessage }, 
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }




// again new ////////////


// import { NextRequest, NextResponse } from 'next/server';
// import * as square from 'square';
// import { formatAmountForSquare } from '@/lib/square-payments';
// import { SquareClient } from 'square';
// import {SquareEnvironment} from 'square';

// // Determine environment based on NODE_ENV
// // const environment = process.env.NODE_ENV === 'production'
// //   ? 'production'
// //   : 'sandbox';
// const environment = process.env.NODE_ENV === 'production' 
//   ? SquareEnvironment.Production 
//   : SquareEnvironment.Sandbox;
  
// // Initialize Square client correctly
// // const squareClient = new square.SquareClient({
// // // const squareClient = new SquareClient({
// //   accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
// //   environment: environment as 'sandbox' | 'production',
// // });

// const squareClient = new square.SquareClient({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
//   environment: environment as 'sandbox' | 'production',
// });

// // Get payment API instance
// const paymentsApi = squareClient.paymentsApi;
// // const paymentsApi = squareClient.pay;

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;
    
//     // Validate request data
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' }, 
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }
    
//     // Format idempotency key to prevent double-charging
//     const idempotencyKey = `${planId}_${Date.now()}`;
    
//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);
    
//     // If we're in test mode or missing Square credentials, return mock success
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }
    
//     try {
//       // Create payment with Square API
//       const paymentResponse = await paymentsApi.createPayment({
//       // const paymentResponse = await paymentsApi.create({
//         sourceId,
//         idempotencyKey,
//         amountMoney: {
//           amount: amountInCents,
//           currency: 'USD',
//         },
//         buyerEmailAddress: userInfo.email,
//         // Include metadata about the transaction
//         note: `Subscription - ${planName}`,
//         // Include customer information in metadata
//         billingAddress: {
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           addressLine1: userInfo.address,
//           locality: userInfo.city,
//           country: userInfo.country,
//           postalCode: userInfo.postalCode,
//         },
//         // Add customer metadata
//         customerDetails: {
//           customerInitiated: true,
//           referenceId: userInfo.email
//         }
//       });
      
//       // Log success for debugging
//       console.log('Payment success:', paymentResponse.result);
      
//       // Return success response
//       return NextResponse.json({
//         success: true,
//         payment: paymentResponse.result.payment,
//       });
//     } catch (squareError) {
//       // Handle Square API errors
//       console.error('Square API Error:', squareError);
      
//       let errorMessage = 'Payment processing failed';
      
//       // Safely check if the error is from Square API
//       if (
//         squareError && 
//         typeof squareError === 'object' && 
//         'errors' in squareError && 
//         Array.isArray((squareError as square.ApiError).errors) && 
//         (squareError as square.ApiError).errors.length > 0
//       ) {
//         const apiError = squareError as square.ApiError;
//         errorMessage = apiError.errors[0]?.detail || errorMessage;
//       }
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: errorMessage 
//         }, 
//         { status: 400 }
//       );
//     }
//   } catch (error: unknown) {
//     // Handle general errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Server error processing payment';
    
//     // Try to extract message if error is an object with a message property
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { success: false, error: errorMessage }, 
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }



// New Code From Grok...........


// import { NextRequest, NextResponse } from 'next/server';
// import { SquareClient, SquareEnvironment } from 'square';

// // Define the UserInfo interface for type safety
// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// // Determine environment based on NODE_ENV
// const environment = process.env.NODE_ENV === 'production'
//   ? SquareEnvironment.Production
//   : SquareEnvironment.Sandbox;

// // Initialize Square client with access token and environment
// const squareClient = new SquareClient({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: SquareEnvironment.Sandbox, // Force sandbox for testing
// });

// // POST handler for processing payments
// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;

//     // Validate required payment information
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' },
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }

//     // Generate idempotency key to prevent duplicate charges
//     const idempotencyKey = `${planId}_${Date.now()}`;

//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);

//     // Mock response if Square credentials are missing (for testing)
//     if (!process.env.SQUARE_ACCESS_TOKEN) {
//       console.log('Using mock payment process (Square credentials not configured)');
//       return NextResponse.json({
//         success: true,
//         payment: {
//           id: `mock_payment_${Date.now()}`,
//           status: 'COMPLETED',
//           amount: amount,
//           card: {
//             last4: '1111', // Mock card data
//           },
//         },
//       });
//     }

//     // Create payment using Square API
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey: crypto.randomUUID(), // Generate a unique key
//       amountMoney: {
//         // amount: BigInt(Math.round(amount * 100)),
//         amount: BigInt(amountInCents),
//         currency: 'USD',
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         // country: userInfo.country,
//         country: userInfo.country, // Should now receive "US" instead of "United States"
//         postalCode: userInfo.postalCode,
//       },
//       // referenceId: userInfo.email,
//       customerDetails: {
//         customerInitiated: true,
//         referenceId: userInfo.email,
//       },
//     });

//     // Log success for debugging
//     console.log('Payment success:', paymentResponse.result);

//     // Return successful payment response
//     return NextResponse.json({
//       success: true,
//       payment: paymentResponse.result.payment,
//     });
//   } catch (error) {
//     // Handle payment processing errors
//     console.error('Payment processing error:', error);
//     let errorMessage = 'Payment processing failed';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return NextResponse.json(
//       { success: false, error: errorMessage },
//       { status: 400 }
//     );
//   }
// }

// // Type guard to validate userInfo object
// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }




// /////////////////////////////////////////////////////////////////////////////////////////////////



// import { NextRequest, NextResponse } from 'next/server';
// import { SquareClient, SquareEnvironment } from 'square';
// import { randomUUID } from 'crypto';

// // Define the UserInfo interface for type safety
// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// // POST handler for processing payments
// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;

//     // Validate required payment information
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' },
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }

//     // Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error('Square access token is missing in environment variables');
//       return NextResponse.json(
//         { success: false, error: 'Payment service configuration error' },
//         { status: 500 }
//       );
//     }

//     // Initialize Square client with access token and environment
//     // Determine environment based on access token format (sandbox tokens start with EAAAEk)
//     const environment = squareAccessToken.startsWith('EAAAEk') 
//       ? SquareEnvironment.Sandbox 
//       : SquareEnvironment.Production;
    
//     console.log(`Using Square ${environment} environment`);

//     // const squareClient = new SquareClient({
//     //   // accessToken: squareAccessToken,
//     //   token: squareAccessToken,
//     //   environment: environment,
//     // });

//     const squareClient = new SquareClient({
//       token: process.env.SQUARE_ACCESS_TOKEN,
//       environment: SquareEnvironment.Sandbox  // Explicitly use Sandbox for testing
//     });

//     // Generate idempotency key to prevent duplicate charges
//     const idempotencyKey = randomUUID();

//     const getCountryCode = (countryName: string): string => {
//       const countryCodes: { [key: string]: string } = {
//         "United States": "US",
//         "Canada": "CA",
//         // Add more country codes as needed
//       };
//       return countryCodes[countryName] || "US"; // Default to "US" if country code is not found
//     }

//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);

//     // Create payment using Square API
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: 'USD',
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName || 'Standard Plan'}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         // country: getCountryCode(userInfo.country),
//         country: userInfo.country,
//         postalCode: userInfo.postalCode,
//       },
//       customerDetails: {
//         customerInitiated: true,
//         referenceId: userInfo.email,
//       },
//     });

//     // Log success for debugging
//     console.log('Payment success:', paymentResponse.result);

//     // Return successful payment response
//     return NextResponse.json({
//       success: true,
//       payment: paymentResponse.result.payment,
//     });
//   } catch (error) {
//     // Handle payment processing errors
//     console.error('Payment processing error:', error);
    
//     // Provide more descriptive error messages based on error type
//     if (error instanceof Error) {
//       // Extract Square API error details if available
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: squareError.errors[0]?.detail || 'Payment processing failed',
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category 
//           },
//           { status: squareError.statusCode }
//         );
//       }
      
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, error: 'Unknown payment processing error' },
//       { status: 500 }
//     );
//   }
// }

// // Type guard to validate userInfo object
// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }




// new code ok check it.....................//////////////////////////////////////////////////
///////////////////

// Working API (Little BIT Man....)


// import { NextRequest, NextResponse } from 'next/server';
// import { SquareClient, SquareEnvironment } from 'square';
// // import { SquareClient, SquareEnvironment, Country } from 'square';

// import { randomUUID } from 'crypto';

// // Define the UserInfo interface for type safety
// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// /**
//  * Convert country name to ISO country code
//  * @param countryName Full country name
//  * @returns ISO country code
//  */
// // const getCountryCode = (countryName: string): Country => {
// //   const countryCodes: { [key: string]: Country } = {
// //     "United States": Country.UnitedStates,
// //     "US": Country.UnitedStates,
// //     "Canada": Country.Canada,
// //     "CA": Country.Canada,
// //     // Add more mappings as needed
// //   };
  
// //   // Default to US if not found
// //   return countryCodes[countryName] || Country.UnitedStates;
// // };


// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     "US": "US",
//     "Canada": "CA",
//     "CA": "CA",
//     // Add more mappings as needed
//   };

//   // Default to "US" if not found
//   return countryCodes[countryName] || "US";
// };


// // POST handler for processing payments
// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;

//     // Validate required payment information
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' },
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }

//     // Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error('Square access token is missing in environment variables');
//       return NextResponse.json(
//         { success: false, error: 'Payment service configuration error' },
//         { status: 500 }
//       );
//     }

//     // Initialize Square client with access token and environment
//     console.log(`Using Square sandbox environment`);

//     const squareClient = new SquareClient({
//       token: process.env.SQUARE_ACCESS_TOKEN,
//       environment: SquareEnvironment.Sandbox  // Explicitly use Sandbox for testing
//     });

//     // Generate idempotency key to prevent duplicate charges
//     const idempotencyKey = randomUUID();

//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);

//     // Create payment using Square API
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: 'USD',
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName || 'Standard Plan'}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         // country: getCountryCode(userInfo.country), // Convert to Country enum
//         // country: getCountryCode(userInfo.country),
//         postalCode: userInfo.postalCode,
//       },
//       customerDetails: {
//         customerInitiated: true,
//         // The referenceId property has been removed as it doesn't exist in CustomerDetails
//       },
//     });

//     // Log success for debugging
//     console.log('Payment response:', paymentResponse);

//     // Return successful payment response (fixed property access)
//     return NextResponse.json({
//       success: true,
//       payment: paymentResponse.payment,
//     });
//   } catch (error) {
//     // Handle payment processing errors
//     console.error('Payment processing error:', error);
    
//     // Provide more descriptive error messages based on error type
//     if (error instanceof Error) {
//       // Extract Square API error details if available
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: squareError.errors[0]?.detail || 'Payment processing failed',
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category 
//           },
//           { status: squareError.statusCode }
//         );
//       }
      
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, error: 'Unknown payment processing error' },
//       { status: 500 }
//     );
//   }
// }

// // Type guard to validate userInfo object
// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }





// // new code ok check it.....................//////////////////////////////////////////////////
// ///////////////////

// // Working API (Little BIT Man....) 

// /////////////////////////////

// import { NextRequest, NextResponse } from 'next/server';
// import { SquareClient, SquareEnvironment } from 'square';
// import { randomUUID } from 'crypto';

// // Define the UserInfo interface for type safety
// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     "US": "US",
//     "Canada": "CA",
//     "CA": "CA",
//     // Add more mappings as needed
//   };

//   // Default to "US" if not found
//   return countryCodes[countryName] || "US";
// };

// // Helper function to convert BigInt values to numbers in the response
// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) {
//     return obj;
//   }
  
//   if (typeof obj === 'bigint') {
//     return Number(obj);
//   }
  
//   if (typeof obj === 'object') {
//     if (Array.isArray(obj)) {
//       return obj.map(replaceBigIntWithNumber);
//     }
    
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
  
//   return obj;
// }

// // POST handler for processing payments
// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;

//     // Validate required payment information
//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required payment information' },
//         { status: 400 }
//       );
//     }

//     // Validate user information
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user information provided' },
//         { status: 400 }
//       );
//     }

//     // Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error('Square access token is missing in environment variables');
//       return NextResponse.json(
//         { success: false, error: 'Payment service configuration error' },
//         { status: 500 }
//       );
//     }

//     // Initialize Square client with access token and environment
//     console.log(`Using Square sandbox environment`);

//     const squareClient = new SquareClient({
//       token: process.env.SQUARE_ACCESS_TOKEN,
//       environment: SquareEnvironment.Sandbox  // Explicitly use Sandbox for testing
//     });

//     // Generate idempotency key to prevent duplicate charges
//     const idempotencyKey = randomUUID();

//     // Format amount for Square API (in cents)
//     const amountInCents = formatAmountForSquare(amount);

//     // Create payment using Square API
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: 'USD',
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName || 'Standard Plan'}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     // Log success for debugging - convert BigInt values to make the log readable
//     console.log('Payment response:', JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2));

//     // Return successful payment response with BigInt values converted to numbers
//     return NextResponse.json({
//       success: true,
//       payment: replaceBigIntWithNumber(paymentResponse.payment),
//     });
//   } catch (error) {
//     // Handle payment processing errors
//     console.error('Payment processing error:', error);
    
//     // Provide more descriptive error messages based on error type
//     if (error instanceof Error) {
//       // Extract Square API error details if available
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: squareError.errors[0]?.detail || 'Payment processing failed',
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category 
//           },
//           { status: squareError.statusCode }
//         );
//       }
      
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, error: 'Unknown payment processing error' },
//       { status: 500 }
//     );
//   }
// }

// // Type guard to validate userInfo object
// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === 'object' &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === 'string' &&
//     typeof (userInfo as UserInfo).lastName === 'string' &&
//     typeof (userInfo as UserInfo).email === 'string' &&
//     typeof (userInfo as UserInfo).phone === 'string' &&
//     typeof (userInfo as UserInfo).address === 'string' &&
//     typeof (userInfo as UserInfo).city === 'string' &&
//     typeof (userInfo as UserInfo).country === 'string' &&
//     typeof (userInfo as UserInfo).postalCode === 'string'
//   );
// }




// // ///////////////////////////////////////////////////////////////

// // NEW API CODE WITH Canister Handling

// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";

// // 1) Import the canister client
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership"; // <— from step #1

// // For type safety, you can import these too
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import type { Principal } from "@dfinity/principal";

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// // Helper function to convert BigInt values to numbers in the response
// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) {
//     return obj;
//   }
//   if (typeof obj === "bigint") {
//     return Number(obj);
//   }
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return obj.map(replaceBigIntWithNumber);
//     }
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // 2) Parse request body
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo } = body;

//     if (!sourceId || !amount) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     // 3) Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing in environment variables");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     // 4) Initialize Square client
//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     // 5) Create payment with Square
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       // note: `Subscription - ${planName || "Standard Plan"}`,
//       // note: `Subscription - ${planName}`,
//       note: `Subscription - ${planName}`, // Safe to use planName now
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     // 6) If successful, store user & membership info in the canister
//     //    (This is the main addition)
//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;

//       // (A) Get canister client
//       const canisterClient = getCanisterClient();

//       // (B) Identify membership tier from planName
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       // (C) Decide how you handle user identity (Principal). 
//       //     - If you have an authenticated user, you might get the principal from session. 
//       //     - If not, you can store an "unauthenticated" user or a placeholder principal.
//       // For example, if you do NOT have an authenticated user, 
//       // you might generate or store a “dummy” principal. 
//       // For demonstration, we'll just do a random principal:
//       // (In real code, you'd likely pass a real user principal from your auth flow.)
//       // const dummyPrincipal = "aaaaa-aa";
//       // Destructure userPrincipal from the request body
// const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

// // Validate the userPrincipal exists and is valid (a proper principal string)
// // For production, you might also verify it using your auth middleware or similar
// if (!userPrincipal) {
//   return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
// }

// // Instead of dummyPrincipal, use the provided one:
// const validPrincipal = userPrincipal; // You may need additional validation here 
      
//       // (D) Check if user already exists
//       const existingUser = await canisterClient.getUserProfile(validPrincipal);
      
//       if (!existingUser) {
//         // Create user in the canister
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`,
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [], 
//         });
//       } else {
//         // Update existing user membership
//         await canisterClient.updateUserProfile(validPrincipal, {
//           membershipTier: [membershipTier], // use IDL.Opt(MembershipTier) style
//         });
//       }

//       // (E) Optionally, store the payment method in the canister
//       //     if you'd like to associate the card details
//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         const paymentMethod = {
//           cardType: card.cardBrand || "Unknown",
//           lastFourDigits: card.last4 || "",
//           tokenId: sourceId, // or use a real token if you have it
//         };
//         await canisterClient.addPaymentMethod(validPrincipal, paymentMethod);
//       }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       // 7) Return success with payment info
//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     // If no payment returned, handle it as an error
//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);

//     if (error instanceof Error) {
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: squareError.errors[0]?.detail || "Payment processing failed",
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category,
//           },
//           { status: squareError.statusCode }
//         );
//       }
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: "Unknown payment processing error" },
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }











///////////////////////////// New code



// // ///////////////////////////////////////////////////////////////

// // NEW API CODE WITH Canister Handling

// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";

// // 1) Import the canister client
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership"; // <— from step #1

// // For type safety, you can import these too
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// // import type { Principal } from "@dfinity/principal";
// import { Principal } from '@dfinity/principal';

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// // Helper function to convert BigInt values to numbers in the response
// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) {
//     return obj;
//   }
//   if (typeof obj === "bigint") {
//     return Number(obj);
//   }
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return obj.map(replaceBigIntWithNumber);
//     }
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// // export async function POST(request: NextRequest) {
// //   try {
// //     // 2) Parse request body
// //     const body = await request.json();
// //     const { sourceId, amount, planId, planName, userInfo } = body;

// //     if (!sourceId || !amount) {
// //       return NextResponse.json(
// //         { success: false, error: "Missing required payment information" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!userInfo || !validateUserInfo(userInfo)) {
// //       return NextResponse.json(
// //         { success: false, error: "Invalid user information provided" },
// //         { status: 400 }
// //       );
// //     }

// //     // 3) Check if Square credentials exist
// //     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
// //     if (!squareAccessToken) {
// //       console.error("Square access token is missing in environment variables");
// //       return NextResponse.json(
// //         { success: false, error: "Payment service configuration error" },
// //         { status: 500 }
// //       );
// //     }

// //     // 4) Initialize Square client
// //     console.log("Using Square sandbox environment");
// //     const squareClient = new SquareClient({
// //       token: squareAccessToken,
// //       environment: SquareEnvironment.Sandbox,
// //     });

// //     const idempotencyKey = randomUUID();
// //     const amountInCents = formatAmountForSquare(amount);

// //     // 5) Create payment with Square
// //     const paymentResponse = await squareClient.payments.create({
// //       sourceId,
// //       idempotencyKey,
// //       amountMoney: {
// //         amount: BigInt(amountInCents),
// //         currency: "USD",
// //       },
// //       buyerEmailAddress: userInfo.email,
// //       // note: `Subscription - ${planName || "Standard Plan"}`,
// //       // note: `Subscription - ${planName}`,
// //       note: `Subscription - ${planName}`, // Safe to use planName now
// //       billingAddress: {
// //         firstName: userInfo.firstName,
// //         lastName: userInfo.lastName,
// //         addressLine1: userInfo.address,
// //         locality: userInfo.city,
// //         postalCode: userInfo.postalCode,
// //         country: getCountryCode(userInfo.country),
// //       },
// //       customerDetails: {
// //         customerInitiated: true,
// //       },
// //     });

// //     // 6) If successful, store user & membership info in the canister
// //     //    (This is the main addition)
// //     if (paymentResponse.payment) {
// //       const { payment } = paymentResponse;

// //       // (A) Get canister client
// //       const canisterClient = getCanisterClient();

// //       // (B) Identify membership tier from planName
// //       const membershipTier = mapPlanNameToMembershipTier(planName);

// //       // (C) Decide how you handle user identity (Principal). 
// //       //     - If you have an authenticated user, you might get the principal from session. 
// //       //     - If not, you can store an "unauthenticated" user or a placeholder principal.
// //       // For example, if you do NOT have an authenticated user, 
// //       // you might generate or store a “dummy” principal. 
// //       // For demonstration, we'll just do a random principal:
// //       // (In real code, you'd likely pass a real user principal from your auth flow.)
// //       // const dummyPrincipal = "aaaaa-aa";
// //       // Destructure userPrincipal from the request body
// // const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

// // // Validate the userPrincipal exists and is valid (a proper principal string)
// // // For production, you might also verify it using your auth middleware or similar
// // if (!userPrincipal) {
// //   return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
// // }

// // // Instead of dummyPrincipal, use the provided one:
// // const validPrincipal = userPrincipal; // You may need additional validation here 
      
// //       // (D) Check if user already exists
// //       const existingUser = await canisterClient.getUserProfile(validPrincipal);
      
// //       if (!existingUser) {
// //         // Create user in the canister
// //         await canisterClient.createUser({
// //           name: `${userInfo.firstName} ${userInfo.lastName}`,
// //           email: userInfo.email,
// //           phone: userInfo.phone,
// //           address: userInfo.address,
// //           membershipTier: membershipTier,
// //           paymentMethods: [], 
// //         });
// //       } else {
// //         // Update existing user membership
// //         await canisterClient.updateUserProfile(validPrincipal, {
// //           membershipTier: [membershipTier], // use IDL.Opt(MembershipTier) style
// //         });
// //       }

// //       // (E) Optionally, store the payment method in the canister
// //       //     if you'd like to associate the card details
// //       if (payment.cardDetails?.card) {
// //         const { card } = payment.cardDetails;
// //         const paymentMethod = {
// //           cardType: card.cardBrand || "Unknown",
// //           lastFourDigits: card.last4 || "",
// //           tokenId: sourceId, // or use a real token if you have it
// //         };
// //         await canisterClient.addPaymentMethod(validPrincipal, paymentMethod);
// //       }

// //       console.log(
// //         "Payment response:",
// //         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
// //       );

// //       // 7) Return success with payment info
// //       return NextResponse.json({
// //         success: true,
// //         payment: replaceBigIntWithNumber(paymentResponse.payment),
// //       });
// //     }

// //     // If no payment returned, handle it as an error
// //     return NextResponse.json(
// //       { success: false, error: "Payment failed or not returned" },
// //       { status: 400 }
// //     );
// //   } catch (error) {
// //     console.error("Payment processing error:", error);

// //     if (error instanceof Error) {
// //       const squareError = error as any;
// //       if (squareError.statusCode && squareError.errors) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             error: squareError.errors[0]?.detail || "Payment processing failed",
// //             code: squareError.errors[0]?.code,
// //             category: squareError.errors[0]?.category,
// //           },
// //           { status: squareError.statusCode }
// //         );
// //       }
// //       return NextResponse.json(
// //         { success: false, error: error.message },
// //         { status: 400 }
// //       );
// //     }

// //     return NextResponse.json(
// //       { success: false, error: "Unknown payment processing error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function POST(request: NextRequest) {
//   const { userPrincipal } = await request.json();
//   console.log("Received userPrincipal:", userPrincipal);

//   try {
//     // Attempt to convert the string to a Principal object
//     Principal.fromText(userPrincipal);
//   } catch (e) {
//     return NextResponse.json(
//       { success: false, error: 'Invalid user principal format' },
//       { status: 400 }
//     );
//   }

//   // const existingUser = await canisterClient.getUserProfile(userPrincipal);
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     // Ensure all critical fields are present
//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information (sourceId, amount, or planName)" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`, // Safe to use planName now
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       // const existingUser = await canisterClient.getUserProfile(userPrincipal);
//       const existingUser = await canisterClient.getUserProfile(userPrincipal);

//       if (!existingUser) {
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`,
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [],
//         });
//       } else {
//         await canisterClient.updateUserProfile(userPrincipal, {
//           membershipTier: membershipTier, // Adjusted below if optional
//         });
//       }

//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         const paymentMethod = {
//           cardType: card.cardBrand || "Unknown",
//           lastFourDigits: card.last4 || "",
//           tokenId: sourceId,
//         };
//         await canisterClient.addPaymentMethod(userPrincipal, paymentMethod);
//       }

//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);
//     return NextResponse.json(
//       { success: false, error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }


























// /////////////////////////////////////////////////////////////////////////////////

// // new code

// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import { Principal } from '@dfinity/principal';

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// // Helper function to convert BigInt values to numbers in the response
// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) {
//     return obj;
//   }
//   if (typeof obj === "bigint") {
//     return Number(obj);
//   }
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return obj.map(replaceBigIntWithNumber);
//     }
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // Read the request body only once
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     // Log the received userPrincipal for debugging
//     console.log("Received userPrincipal:", userPrincipal);

//     // Validate userPrincipal format
//     try {
//       Principal.fromText(userPrincipal);
//     } catch (e) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user principal format" },
//         { status: 400 }
//       );
//     }

//     // Ensure all critical fields are present
//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information (sourceId, amount, or planName)" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     // Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     // Initialize Square client
//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     // Create payment with Square
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       // Check if user already exists in the canister
//       const existingUser = await canisterClient.getUserProfile(userPrincipal);

//       if (!existingUser) {
//         // Create new user in the canister
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`,
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [],
//         });
//       } else {
//         // Update existing user's membership
//         await canisterClient.updateUserProfile(userPrincipal, {
//           membershipTier: membershipTier, // Assuming non-optional; adjust if needed
//         });
//       }

//       // Optionally store the payment method
//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         const paymentMethod = {
//           cardType: card.cardBrand || "Unknown",
//           lastFourDigits: card.last4 || "",
//           tokenId: sourceId,
//         };
//         await canisterClient.addPaymentMethod(userPrincipal, paymentMethod);
//       }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       // Return success with payment info
//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     // If no payment returned, handle as an error
//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);

//     if (error instanceof Error) {
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: squareError.errors[0]?.detail || "Payment processing failed",
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category,
//           },
//           { status: squareError.statusCode }
//         );
//       }
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: "Unknown payment processing error" },
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }
























/////////////////////////////////////////////////////////




// // // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import { Principal } from "@dfinity/principal";

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// // Helper function to format amount for Square API (converts dollars to cents)
// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100); // Convert dollars to cents and ensure integer
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// // Helper function to convert BigInt values to numbers in the response
// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) {
//     return obj;
//   }
//   if (typeof obj === "bigint") {
//     return Number(obj);
//   }
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return obj.map(replaceBigIntWithNumber);
//     }
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // Read the request body once
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     // Log the received userPrincipal for debugging
//     console.log("Received userPrincipal:", userPrincipal);

//     // Validate and convert userPrincipal to a Principal object
//     let principal: Principal;
//     try {
//       principal = Principal.fromText(userPrincipal);
//     } catch (e) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user principal format" },
//         { status: 400 }
//       );
//     }

//     // Ensure all critical fields are present
//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information (sourceId, amount, or planName)" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     // Check if Square credentials exist
//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     // Initialize Square client
//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     // Create payment with Square
//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       // Check if user already exists in the canister using Principal object
//       const existingUser = await canisterClient.getUserProfile(principal);

//       if (!existingUser) {
//         // Create new user in the canister
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`,
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [],
//         });
//       } else {
//         // Update existing user's membership
//         await canisterClient.updateUserProfile(principal, {
//           membershipTier: membershipTier, // Assuming non-optional; adjust if needed
//         });
//       }

//       // Optionally store the payment method
//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         const paymentMethod = {
//           cardType: card.cardBrand || "Unknown",
//           lastFourDigits: card.last4 || "",
//           tokenId: sourceId,
//         };
//         await canisterClient.addPaymentMethod(principal, paymentMethod);
//       }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       // Return success with payment info
//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     // If no payment returned, handle as an error
//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);

//     if (error instanceof Error) {
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: squareError.errors[0]?.detail || "Payment processing failed",
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category,
//           },
//           { status: squareError.statusCode }
//         );
//       }
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: "Unknown payment processing error" },
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }
















//////////////////////////////////////////////////




// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import { Principal } from "@dfinity/principal";

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100);
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) return obj;
//   if (typeof obj === "bigint") return Number(obj);
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) return obj.map(replaceBigIntWithNumber);
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     console.log("Received userPrincipal:", userPrincipal);

//     let principal: Principal;
//     try {
//       principal = Principal.fromText(userPrincipal);
//     } catch (e) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user principal format" },
//         { status: 400 }
//       );
//     }

//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information (sourceId, amount, or planName)" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       const existingUser = await canisterClient.getUserProfile(principal);

//       if (!existingUser) {
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`,
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [],
//         });
//       } else {
//         // Update with required fields (e.g., name) to satisfy canister requirements
//         await canisterClient.updateUserProfile(principal, {
//           name: existingUser.name, // Preserve existing name
//           email: existingUser.email, // Preserve existing email
//           phone: existingUser.phone, // Preserve existing phone
//           address: existingUser.address, // Preserve existing address
//           membershipTier: membershipTier,
//           paymentMethods: existingUser.paymentMethods, // Preserve existing payment methods
//         });
//       }

//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         const paymentMethod = {
//           cardType: card.cardBrand || "Unknown",
//           lastFourDigits: card.last4 || "",
//           tokenId: sourceId,
//         };
//         await canisterClient.addPaymentMethod(principal, paymentMethod);
//       }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);

//     if (error instanceof Error) {
//       const squareError = error as any;
//       if (squareError.statusCode && squareError.errors) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: squareError.errors[0]?.detail || "Payment processing failed",
//             code: squareError.errors[0]?.code,
//             category: squareError.errors[0]?.category,
//           },
//           { status: squareError.statusCode }
//         );
//       }
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: "Unknown payment processing error" },
//       { status: 500 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }












//////////////////////////////////////////



// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import { Principal } from "@dfinity/principal";

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100);
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) return obj;
//   if (typeof obj === "bigint") return Number(obj);
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) return obj.map(replaceBigIntWithNumber);
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     console.log("Received userPrincipal:", userPrincipal);

//     let principal: Principal;
//     try {
//       principal = Principal.fromText(userPrincipal);
//     } catch (e) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user principal format" },
//         { status: 400 }
//       );
//     }

//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information" },
//         { status: 400 }
//       );
//     }

    
//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       const existingUser = await canisterClient.getUserProfile(principal);

//       if (!existingUser) {
//         // await canisterClient.createUser({
//         //   name: `${userInfo.firstName} ${userInfo.lastName}`,
//         //   email: userInfo.email,
//         //   phone: userInfo.phone,
//         //   address: userInfo.address,
//         //   membershipTier: membershipTier,
//         //   paymentMethods: [],
//         // });
//         await canisterClient.createUser({
//           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [], // Initialize empty as per Motoko code
//         });
      
//       } else {
//         // Use userInfo to update fields, falling back to existingUser if not provided
//         await canisterClient.updateUserProfile(principal, {
//           name: `${userInfo.firstName} ${userInfo.lastName}`, // Always update with form data
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: existingUser.paymentMethods, // Preserve existing
//         });
//         // const updatedUser = await canisterClient.getUserProfile(principal);
//         // console.log("Updated user profile:", JSON.stringify(updatedUser, null, 2));
//         // await canisterClient.updateUserProfile(principal, {
//         //   name: [`${userInfo.firstName} ${userInfo.lastName}`.trim()],
//         //   email: [userInfo.email],
//         //   phone: [userInfo.phone],
//         //   address: [userInfo.address],
//         //   membershipTier: [membershipTier],
//         //   paymentMethods: [existingUser.paymentMethods], // Wrap existing methods in array
//         // });
//       }

//       // After adding payment method
// const updatedUser = await canisterClient.getUserProfile(principal);
// console.log("Updated user with payment methods:", updatedUser?.paymentMethods);

//       // if (payment.cardDetails?.card) {
//       //   const { card } = payment.cardDetails;
//       //   const paymentMethod = {
//       //     cardType: card.cardBrand || "Unknown",
//       //     lastFourDigits: card.last4 || "",
//       //     tokenId: sourceId,
//       //   };

//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         try {
//           await canisterClient.addPaymentMethod(principal, {
//             cardType: card.cardBrand || "Unknown",
//             lastFourDigits: card.last4 || "",
//             tokenId: sourceId,
//           });
//           console.log("Payment method added successfully");
//         } catch (error) {
//           console.error("Failed to add payment method:", error);
//           // Handle error appropriately
//         }
//       }
  

//         // await canisterClient.addPaymentMethod(principal, paymentMethod);
//         // When adding payment methods:
// // await canisterClient.addPaymentMethod(principal, {
// //   cardType: card.cardBrand || "Unknown",
// //   lastFourDigits: card.last4 || "",
// //   tokenId: sourceId,
// // });
//       // }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 400 }
//     );
//   }
// }

// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }

















////////////////////////////////////




// // src/app/api/process-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SquareClient, SquareEnvironment } from "square";
// import { randomUUID } from "crypto";
// import { getCanisterClient } from "@/lib/canister";
// import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
// import { Principal } from "@dfinity/principal";

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100);
// }

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) return obj;
//   if (typeof obj === "bigint") return Number(obj);
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) return obj.map(replaceBigIntWithNumber);
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json();
// //     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

// //     console.log("Received userPrincipal:", userPrincipal);

// //     let principal: Principal;
// //     try {
// //       principal = Principal.fromText(userPrincipal);
// //     } catch (e) {
// //       return NextResponse.json(
// //         { success: false, error: "Invalid user principal format" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!sourceId || !amount || !planName) {
// //       return NextResponse.json(
// //         { success: false, error: "Missing required payment information" },
// //         { status: 400 }
// //       );
// //     }

    
// //     if (!userInfo || !validateUserInfo(userInfo)) {
// //       return NextResponse.json(
// //         { success: false, error: "Invalid user information provided" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!userPrincipal) {
// //       return NextResponse.json(
// //         { success: false, error: "User not authenticated" },
// //         { status: 401 }
// //       );
// //     }

// //     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
// //     if (!squareAccessToken) {
// //       console.error("Square access token is missing");
// //       return NextResponse.json(
// //         { success: false, error: "Payment service configuration error" },
// //         { status: 500 }
// //       );
// //     }

// //     console.log("Using Square sandbox environment");
// //     const squareClient = new SquareClient({
// //       token: squareAccessToken,
// //       environment: SquareEnvironment.Sandbox,
// //     });

// //     const idempotencyKey = randomUUID();
// //     const amountInCents = formatAmountForSquare(amount);

// //     const paymentResponse = await squareClient.payments.create({
// //       sourceId,
// //       idempotencyKey,
// //       amountMoney: {
// //         amount: BigInt(amountInCents),
// //         currency: "USD",
// //       },
// //       buyerEmailAddress: userInfo.email,
// //       note: `Subscription - ${planName}`,
// //       billingAddress: {
// //         firstName: userInfo.firstName,
// //         lastName: userInfo.lastName,
// //         addressLine1: userInfo.address,
// //         locality: userInfo.city,
// //         postalCode: userInfo.postalCode,
// //         country: getCountryCode(userInfo.country),
// //       },
// //       customerDetails: {
// //         customerInitiated: true,
// //       },
// //     });

// //     if (paymentResponse.payment) {
// //       const { payment } = paymentResponse;
// //       const canisterClient = getCanisterClient();
// //       const membershipTier = mapPlanNameToMembershipTier(planName);

// //       const existingUser = await canisterClient.getUserProfile(principal);

// //       if (!existingUser) {
// //         // await canisterClient.createUser({
// //         //   name: `${userInfo.firstName} ${userInfo.lastName}`,
// //         //   email: userInfo.email,
// //         //   phone: userInfo.phone,
// //         //   address: userInfo.address,
// //         //   membershipTier: membershipTier,
// //         //   paymentMethods: [],
// //         // });
// //         await canisterClient.createUser({
// //           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
// //           email: userInfo.email,
// //           phone: userInfo.phone,
// //           address: userInfo.address,
// //           membershipTier: membershipTier,
// //           paymentMethods: [], // Initialize empty as per Motoko code
// //         });
      
// //       } else {
// //         // Use userInfo to update fields, falling back to existingUser if not provided
// //         await canisterClient.updateUserProfile(principal, {
// //           name: `${userInfo.firstName} ${userInfo.lastName}`, // Always update with form data
// //           email: userInfo.email,
// //           phone: userInfo.phone,
// //           address: userInfo.address,
// //           membershipTier: membershipTier,
// //           paymentMethods: existingUser.paymentMethods, // Preserve existing
// //         });
// //         // const updatedUser = await canisterClient.getUserProfile(principal);
// //         // console.log("Updated user profile:", JSON.stringify(updatedUser, null, 2));
// //         // await canisterClient.updateUserProfile(principal, {
// //         //   name: [`${userInfo.firstName} ${userInfo.lastName}`.trim()],
// //         //   email: [userInfo.email],
// //         //   phone: [userInfo.phone],
// //         //   address: [userInfo.address],
// //         //   membershipTier: [membershipTier],
// //         //   paymentMethods: [existingUser.paymentMethods], // Wrap existing methods in array
// //         // });
// //       }

// //       // After adding payment method
// // const updatedUser = await canisterClient.getUserProfile(principal);
// // console.log("Updated user with payment methods:", updatedUser?.paymentMethods);

// //       // if (payment.cardDetails?.card) {
// //       //   const { card } = payment.cardDetails;
// //       //   const paymentMethod = {
// //       //     cardType: card.cardBrand || "Unknown",
// //       //     lastFourDigits: card.last4 || "",
// //       //     tokenId: sourceId,
// //       //   };

// //       if (payment.cardDetails?.card) {
// //         const { card } = payment.cardDetails;
// //         try {
// //           await canisterClient.addPaymentMethod(principal, {
// //             cardType: card.cardBrand || "Unknown",
// //             lastFourDigits: card.last4 || "",
// //             tokenId: sourceId,
// //           });
// //           console.log("Payment method added successfully");
// //         } catch (error) {
// //           console.error("Failed to add payment method:", error);
// //           // Handle error appropriately
// //         }
// //       }
  

// //         // await canisterClient.addPaymentMethod(principal, paymentMethod);
// //         // When adding payment methods:
// // // await canisterClient.addPaymentMethod(principal, {
// // //   cardType: card.cardBrand || "Unknown",
// // //   lastFourDigits: card.last4 || "",
// // //   tokenId: sourceId,
// // // });
// //       // }

// //       console.log(
// //         "Payment response:",
// //         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
// //       );

// //       return NextResponse.json({
// //         success: true,
// //         payment: replaceBigIntWithNumber(paymentResponse.payment),
// //       });
// //     }

// //     return NextResponse.json(
// //       { success: false, error: "Payment failed or not returned" },
// //       { status: 400 }
// //     );
// //   } catch (error) {
// //     console.error("Payment processing error:", error);
// //     return NextResponse.json(
// //       { success: false, error: error instanceof Error ? error.message : "Unknown error" },
// //       { status: 400 }
// //     );
// //   }
// // }

// // ... (keep existing imports and helper functions unchanged)

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

//     console.log("Received userPrincipal:", userPrincipal);

//     let principal: Principal;
//     try {
//       principal = Principal.fromText(userPrincipal);
//     } catch (e) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user principal format" },
//         { status: 400 }
//       );
//     }

//     if (!sourceId || !amount || !planName) {
//       return NextResponse.json(
//         { success: false, error: "Missing required payment information" },
//         { status: 400 }
//       );
//     }

//     if (!userInfo || !validateUserInfo(userInfo)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid user information provided" },
//         { status: 400 }
//       );
//     }

//     if (!userPrincipal) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
//     if (!squareAccessToken) {
//       console.error("Square access token is missing");
//       return NextResponse.json(
//         { success: false, error: "Payment service configuration error" },
//         { status: 500 }
//       );
//     }

//     console.log("Using Square sandbox environment");
//     const squareClient = new SquareClient({
//       token: squareAccessToken,
//       environment: SquareEnvironment.Sandbox,
//     });

//     const idempotencyKey = randomUUID();
//     const amountInCents = formatAmountForSquare(amount);

//     const paymentResponse = await squareClient.payments.create({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount: BigInt(amountInCents),
//         currency: "USD",
//       },
//       buyerEmailAddress: userInfo.email,
//       note: `Subscription - ${planName}`,
//       billingAddress: {
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         addressLine1: userInfo.address,
//         locality: userInfo.city,
//         postalCode: userInfo.postalCode,
//         country: getCountryCode(userInfo.country),
//       },
//       customerDetails: {
//         customerInitiated: true,
//       },
//     });

//     if (paymentResponse.payment) {
//       const { payment } = paymentResponse;
//       const canisterClient = getCanisterClient();
//       const membershipTier = mapPlanNameToMembershipTier(planName);

//       const existingUser = await canisterClient.getUserProfile(principal);

//       if (!existingUser) {
//         await canisterClient.createUser(principal, {
//           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//           paymentMethods: [],
//         });
//       } else {
//         await canisterClient.updateUserProfile(principal, {
//           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
//           email: userInfo.email,
//           phone: userInfo.phone,
//           address: userInfo.address,
//           membershipTier: membershipTier,
//         });
//       }

//       // await canisterClient.createUser({
//         //           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
//         //           email: userInfo.email,
//         //           phone: userInfo.phone,
//         //           address: userInfo.address,
//         //           membershipTier: membershipTier,
//         //           paymentMethods: [], // Initialize empty as per Motoko code
//         //         });

//       if (payment.cardDetails?.card) {
//         const { card } = payment.cardDetails;
//         try {
//           await canisterClient.addPaymentMethod(principal, {
//             cardType: card.cardBrand || "Unknown",
//             lastFourDigits: card.last4 || "",
//             tokenId: sourceId,
//           });
//           console.log("Payment method added successfully");
//         } catch (error) {
//           console.error("Failed to add payment method:", error);
//         }
//       }

//       console.log(
//         "Payment response:",
//         JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
//       );

//       return NextResponse.json({
//         success: true,
//         payment: replaceBigIntWithNumber(paymentResponse.payment),
//       });
//     }

//     return NextResponse.json(
//       { success: false, error: "Payment failed or not returned" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Payment processing error:", error);
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 400 }
//     );
//   }
// }

// // ... (keep validateUserInfo unchanged)



// function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
//   return (
//     typeof userInfo === "object" &&
//     userInfo !== null &&
//     typeof (userInfo as UserInfo).firstName === "string" &&
//     typeof (userInfo as UserInfo).lastName === "string" &&
//     typeof (userInfo as UserInfo).email === "string" &&
//     typeof (userInfo as UserInfo).phone === "string" &&
//     typeof (userInfo as UserInfo).address === "string" &&
//     typeof (userInfo as UserInfo).city === "string" &&
//     typeof (userInfo as UserInfo).country === "string" &&
//     typeof (userInfo as UserInfo).postalCode === "string"
//   );
// }

















//////////////////////////////////////////////////////////





// src/app/api/process-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { getCanisterClient } from "@/lib/canister";
import { mapPlanNameToMembershipTier } from "@/utils/membership";
// import type { PaymentMethod, UserProfile } from "@/lib/canister";
import { Principal } from "@dfinity/principal";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

function formatAmountForSquare(amount: number): number {
  return Math.round(amount * 100);
}

// const getCountryCode = (countryName: string): string => {
//   const countryCodes: { [key: string]: string } = {
//     "United States": "US",
//     US: "US",
//     Canada: "CA",
//     CA: "CA",
//   };
//   return countryCodes[countryName] || "US";
// };

// function replaceBigIntWithNumber(obj: any): any {
//   if (obj === null || obj === undefined) return obj;
//   if (typeof obj === "bigint") return Number(obj);
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) return obj.map(replaceBigIntWithNumber);
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = replaceBigIntWithNumber(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }


function replaceBigIntWithNumber(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return Number(obj);
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map((item) => replaceBigIntWithNumber(item));
    }
    const newObj: Record<string, unknown> = {};
    for (const key in obj as Record<string, unknown>) {
      newObj[key] = replaceBigIntWithNumber((obj as Record<string, unknown>)[key]);
    }
    return newObj;
  }
  return obj;
}



export async function POST(request: NextRequest) {
  // try {
  //   const body = await request.json();
  //   const { sourceId, amount, planId, planName, userInfo, userPrincipal } = body;

  //   console.log("Received userPrincipal:", userPrincipal);

  //   let principal: Principal;
  //   try {
  //     principal = Principal.fromText(userPrincipal);
  //   } catch (e) {
  //     return NextResponse.json(
  //       { success: false, error: "Invalid user principal format" },
  //       { status: 400 }
  //     );
  //   }
  try {
    const body = await request.json();
    const { sourceId, amount, planName, userInfo, userPrincipal } = body;

    console.log("Received userPrincipal:", userPrincipal);

    let principal: Principal;
    try {
      principal = Principal.fromText(userPrincipal);
    } catch  {
      return NextResponse.json(
        { success: false, error: "Invalid user principal format" },
        { status: 400 }
      );
    }

    if (!sourceId || !amount || !planName) {
      return NextResponse.json(
        { success: false, error: "Missing required payment information" },
        { status: 400 }
      );
    }

    if (!userInfo || !validateUserInfo(userInfo)) {
      return NextResponse.json(
        { success: false, error: "Invalid user information provided" },
        { status: 400 }
      );
    }

    if (!userPrincipal) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

  //   const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
  //   if (!squareAccessToken) {
  //     console.error("Square access token is missing");
  //     return NextResponse.json(
  //       { success: false, error: "Payment service configuration error" },
  //       { status: 500 }
  //     );
  //   }

  //   console.log("Using Square sandbox environment");
  //   const squareClient = new SquareClient({
  //     token: squareAccessToken,
  //     environment: SquareEnvironment.Sandbox,
  //   });

  //   const idempotencyKey = randomUUID();
  //   const amountInCents = formatAmountForSquare(amount);

  //   const paymentResponse = await squareClient.payments.create({
  //     sourceId,
  //     idempotencyKey,
  //     amountMoney: {
  //       amount: BigInt(amountInCents),
  //       currency: "USD",
  //     },
  //     buyerEmailAddress: userInfo.email,
  //     note: `Subscription - ${planName}`,
  //     billingAddress: {
  //       firstName: userInfo.firstName,
  //       lastName: userInfo.lastName,
  //       addressLine1: userInfo.address,
  //       locality: userInfo.city,
  //       postalCode: userInfo.postalCode,
  //       country: getCountryCode(userInfo.country),
  //     },
  //     customerDetails: {
  //       customerInitiated: true,
  //     },
  //   });

  //   if (paymentResponse.payment) {
  //     const { payment } = paymentResponse;
  //     const canisterClient = getCanisterClient();
  //     const membershipTier = mapPlanNameToMembershipTier(planName);

  //     const existingUser = await canisterClient.getUserProfile(principal);

  //     if (!existingUser) {
  //       await canisterClient.createUser(principal, {
  //         name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
  //         email: userInfo.email,
  //         phone: userInfo.phone,
  //         address: userInfo.address,
  //         membershipTier: membershipTier,
  //         paymentMethods: [],
  //       });
  //     } else {
  //       await canisterClient.updateUserProfile(principal, {
  //         name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
  //         email: userInfo.email,
  //         phone: userInfo.phone,
  //         address: userInfo.address,
  //         membershipTier: membershipTier,
  //       });
  //     }

  //     // await canisterClient.createUser({
  //       //           name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
  //       //           email: userInfo.email,
  //       //           phone: userInfo.phone,
  //       //           address: userInfo.address,
  //       //           membershipTier: membershipTier,
  //       //           paymentMethods: [], // Initialize empty as per Motoko code
  //       //         });

  //     if (payment.cardDetails?.card) {
  //       const { card } = payment.cardDetails;
  //       try {
  //         await canisterClient.addPaymentMethod(principal, {
  //           cardType: card.cardBrand || "Unknown",
  //           lastFourDigits: card.last4 || "",
  //           tokenId: sourceId,
  //         });
  //         console.log("Payment method added successfully");
  //       } catch (error) {
  //         console.error("Failed to add payment method:", error);
  //       }
  //     }

  //     console.log(
  //       "Payment response:",
  //       JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2)
  //     );

  //     return NextResponse.json({
  //       success: true,
  //       payment: replaceBigIntWithNumber(paymentResponse.payment),
  //     });
  //   }

  //   return NextResponse.json(
  //     { success: false, error: "Payment failed or not returned" },
  //     { status: 400 }
  //   );
  // } catch (error) {
  //   console.error("Payment processing error:", error);
  //   return NextResponse.json(
  //     { success: false, error: error instanceof Error ? error.message : "Unknown error" },
  //     { status: 400 }
  //   );
  // }
  const squareClient = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN!,
    environment: SquareEnvironment.Sandbox,
  });

  const idempotencyKey = randomUUID();
  const amountInCents = formatAmountForSquare(amount);

  const paymentResponse = await squareClient.payments.create({
    sourceId,
    idempotencyKey,
    amountMoney: { amount: BigInt(amountInCents), currency: "USD" },
    buyerEmailAddress: userInfo.email,
    note: `Subscription - ${planName}`,
    billingAddress: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      addressLine1: userInfo.address,
      locality: userInfo.city,
      postalCode: userInfo.postalCode,
      // Here is the problem I will later handle this....
      // country: getCountryCode(userInfo.country),
    },
    customerDetails: { customerInitiated: true },
  });

  if (paymentResponse.payment) {
    const { payment } = paymentResponse;
    const canisterClient = getCanisterClient();
    const membershipTier = mapPlanNameToMembershipTier(planName);

    const existingUser = await canisterClient.getUserProfile(principal);
    console.log("Existing user:", existingUser);

    if (!existingUser) {
      console.log("Creating new user for:", principal.toText());
      await canisterClient.createUser(principal, {
        name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        membershipTier: membershipTier,
        paymentMethods: [],
      });
    } else {
      console.log("Updating existing user for:", principal.toText());
      const success = await canisterClient.updateUserProfile(principal, {
        name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        membershipTier: membershipTier,
      });
      if (!success) {
        throw new Error("Failed to update user profile");
      }
    }

    if (payment.cardDetails?.card) {
      const { card } = payment.cardDetails;
      const success = await canisterClient.addPaymentMethod(principal, {
        cardType: card.cardBrand || "Unknown",
        lastFourDigits: card.last4 || "",
        tokenId: sourceId,
      });
      console.log("Payment method added successfully:", success);
      if (!success) {
        throw new Error("Failed to add payment method");
      }
    }

    console.log("Payment response:", JSON.stringify(replaceBigIntWithNumber(paymentResponse), null, 2));

    return NextResponse.json({
      success: true,
      payment: replaceBigIntWithNumber(paymentResponse.payment),
    });
  }

  return NextResponse.json(
    { success: false, error: "Payment failed or not returned" },
    { status: 400 }
  );
} catch (error) {
  console.error("Payment processing error:", error);
  return NextResponse.json(
    { success: false, error: error instanceof Error ? error.message : "Unknown error" },
    { status: 400 }
  );
}
}

// ... (keep validateUserInfo unchanged)



function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
  return (
    typeof userInfo === "object" &&
    userInfo !== null &&
    typeof (userInfo as UserInfo).firstName === "string" &&
    typeof (userInfo as UserInfo).lastName === "string" &&
    typeof (userInfo as UserInfo).email === "string" &&
    typeof (userInfo as UserInfo).phone === "string" &&
    typeof (userInfo as UserInfo).address === "string" &&
    typeof (userInfo as UserInfo).city === "string" &&
    typeof (userInfo as UserInfo).country === "string" &&
    typeof (userInfo as UserInfo).postalCode === "string"
  );
}