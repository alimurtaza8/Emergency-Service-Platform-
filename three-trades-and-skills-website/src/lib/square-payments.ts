// /**
//  * Utility functions for Square Payments
//  */

// // Define type for the Square library
// interface SquarePayments {
//   payments: (
//     applicationId: string,
//     locationId: string
//   ) => {
//     card: () => Promise<any>;
//   };
// }

// // Type for window with Square global
// interface WindowWithSquare extends Window {
//   Square?: SquarePayments;
// }

// /**
//  * Load the Square Web Payments SDK script
//  */
// export async function loadSquareSdk(): Promise<{ payments: any }> {
//   // Check if Square SDK is already loaded
//   if (typeof window !== 'undefined' && (window as WindowWithSquare).Square) {
//     return { payments: (window as WindowWithSquare).Square!.payments };
//   }

//   return new Promise((resolve, reject) => {
//     try {
//       // Get configuration from environment
//       const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//       const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      
//       if (!applicationId || !locationId) {
//         return reject(new Error('Square configuration missing'));
//       }

//       // Create script element
//       const script = document.createElement('script');
//       script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
//       script.crossOrigin = 'anonymous';
//       script.onload = () => {
//         if (!(window as WindowWithSquare).Square) {
//           return reject(new Error('Square SDK failed to load correctly'));
//         }

//         const payments = (window as WindowWithSquare).Square!.payments(
//           applicationId,
//           locationId
//         );
        
//         resolve({ payments });
//       };
//       script.onerror = () => {
//         reject(new Error('Failed to load Square SDK'));
//       };

//       // Append script to document
//       document.body.appendChild(script);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Format amount for Square API (in cents)
//  */
// export function formatAmountForSquare(amount: number): number {
//   return Math.round(amount * 100);
// }

// /**
//  * Format Square money object to display amount
//  */
// export function formatSquareAmount(amount: { amount: number; currency: string }): string {
//   const value = amount.amount / 100;
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: amount.currency,
//   }).format(value);
// } 




// new code
/////////////////////////////////////////////////

/**
 * Utility functions for Square Payments
 */

interface SquareCard {
  tokenize: () => Promise<{
    status: string; // e.g. "OK" for success
    token: string;
    errors?: Array<{ message: string }>;
    details?: {
      card?: {
        cardBrand?: string;
        last4?: string;
      };
    };
  }>;
  attach: (selector: string) => Promise<void>;
}


// Define type for the Square library
interface SquarePayments {
  payments: (
    applicationId: string,
    locationId: string
  ) => {
    card: () => Promise<SquareCard>;
  };
}

// Type for window with Square global
interface WindowWithSquare extends Window {
  Square?: SquarePayments;
}

/**
 * Load the Square Web Payments SDK script
 */
// export async function loadSquareSdk(): Promise<{ payments: SquarePayments["payments"] }> {
//   // Check if Square SDK is already loaded
//   if (typeof window !== 'undefined' && (window as WindowWithSquare).Square) {
//     return { payments: (window as WindowWithSquare).Square!.payments };
//   }

//   return new Promise((resolve, reject) => {
//     try {
//       // Get configuration from environment
//       const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//       const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      
//       if (!applicationId || !locationId) {
//         return reject(new Error('Square configuration missing'));
//       }

//       // Create script element
//       const script = document.createElement('script');
//       script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
//       script.crossOrigin = 'anonymous';
//       script.onload = () => {
//         if (!(window as WindowWithSquare).Square) {
//           return reject(new Error('Square SDK failed to load correctly'));
//         }

//         const payments = (window as WindowWithSquare).Square!.payments(
//           applicationId,
//           locationId
//         );
//         // const payments = (window as WindowWithSquare).Square!.payments(applicationId, locationId);

        
//         resolve({ payments });
//       };
//       script.onerror = () => {
//         reject(new Error('Failed to load Square SDK'));
//       };

//       // Append script to document
//       document.body.appendChild(script);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export async function loadSquareSdk() {
//   try {
//     // Check if Square is already loaded
//     if (window.Square) {
//       console.log('Square SDK already loaded');
//       return window.Square;
//     }

//     // Load the Square SDK script
//     const script = document.createElement('script');
//     script.src = 'https://sandbox.web.squarecdn.com/v1/square.js'; // Sandbox URL
//     script.async = true;

//     const loadPromise = new Promise((resolve, reject) => {
//       script.onload = () => {
//         if (window.Square) {
//           console.log('Square SDK loaded successfully');
//           resolve(window.Square);
//         } else {
//           reject(new Error('Square SDK failed to load'));
//         }
//       };
//       script.onerror = () => reject(new Error('Failed to load Square SDK script'));
//     });

//     document.head.appendChild(script);
//     return await loadPromise;
//   } catch (err) {
//     console.error('Error loading Square SDK:', err);
//     throw err;
//   }
// }

export async function loadSquareSdk(): Promise<{ payments: { card: () => Promise<SquareCard> } }> {
  // Check if Square SDK is already loaded
  if (typeof window !== "undefined" && (window as WindowWithSquare).Square) {
    // Note: Here we must call the function to get the object
    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
    const payments = (window as WindowWithSquare).Square!.payments(applicationId, locationId);
    return { payments };
  }

  return new Promise((resolve, reject) => {
    try {
      // Get configuration from environment
      const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      
      if (!applicationId || !locationId) {
        return reject(new Error("Square configuration missing"));
      }

      // Create script element
      const script = document.createElement("script");
      script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (!(window as WindowWithSquare).Square) {
          return reject(new Error("Square SDK failed to load correctly"));
        }
        // Call the function to get the payments object
        const payments = (window as WindowWithSquare).Square!.payments(applicationId, locationId);
        resolve({ payments });
      };
      script.onerror = () => {
        reject(new Error("Failed to load Square SDK"));
      };

      // Append script to document
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
}



/**
 * Format amount for Square API (in cents)
 */
export function formatAmountForSquare(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Format Square money object to display amount
 */
export function formatSquareAmount(amount: { amount: number; currency: string }): string {
  const value = amount.amount / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: amount.currency,
  }).format(value);
}










