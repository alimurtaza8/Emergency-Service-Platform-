// // src/lib/canister/emergencyServiceInterface.ts
// import type { Principal } from "@dfinity/principal";
// import type { UserProfile, PaymentMethod } from '@/lib/canister';// Ensure these types are defined

// export interface EmergencyService {
//   createUser: (
//     userId: Principal,
//     profile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">
//   ) => Promise<Principal>;
//   getUserProfile: (userId: Principal) => Promise<[UserProfile] | []>;
//   updateUserProfile: (
//     userId: Principal,
//     profile: Partial<UserProfile>
//   ) => Promise<boolean>;
//   addPaymentMethod: (
//     userId: Principal,
//     paymentMethod: PaymentMethod
//   ) => Promise<boolean>;
//   getUserPaymentMethods: (userId: Principal) => Promise<PaymentMethod[]>;
//   // Add additional methods as you actually use them.
// }




// src/lib/canister/emergencyServiceInterface.ts
import type { Principal } from "@dfinity/principal";
import type { UserProfile, PaymentMethod, UpdateUserProfileInput } from './index'; // Adjust import path

export interface EmergencyService {
  createUser: (
    userId: Principal,
    profile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">
  ) => Promise<Principal>;
  getUserProfile: (userId: Principal) => Promise<[UserProfile] | []>;
  updateUserProfile: (
    userId: Principal,
    profile: UpdateUserProfileInput
  ) => Promise<boolean>;
  addPaymentMethod: (
    userId: Principal,
    paymentMethod: PaymentMethod
  ) => Promise<boolean>;
  getUserPaymentMethods: (userId: Principal) => Promise<PaymentMethod[]>;
}