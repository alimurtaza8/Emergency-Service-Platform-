// import { Actor, HttpAgent } from "@dfinity/agent";
// // Import Principal as a type-only import to prevent build errors
// import type { Principal } from "@dfinity/principal";
// import { idlFactory } from "./idl";

// // Type definitions for the canister API
// export type UserId = Principal;

// export type MembershipTier = 
//     | { Free: null }
//     | { Basic: null }
//     | { Standard: null }
//     | { Premium: null }
//     | { Professional: null }
//     | { Enterprise: null };

// export type PaymentMethod = {
//     cardType: string;
//     lastFourDigits: string;
//     tokenId: string;
// };

// export type UserProfile = {
//     id: UserId;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     membershipTier: MembershipTier;
//     paymentMethods: PaymentMethod[];
//     registrationDate: bigint;
//     lastUpdated: bigint;
// };

// export type Location = {
//     latitude: number;
//     longitude: number;
//     address: string;
// };

// export type EmergencyCallStatus = 
//     | { Initiated: null }
//     | { Processing: null }
//     | { Assigned: null }
//     | { Completed: null }
//     | { Cancelled: null };

// export type EmergencyCall = {
//     id: string;
//     userId: UserId;
//     serviceType: string;
//     description: string;
//     location: Location;
//     timestamp: bigint;
//     status: EmergencyCallStatus;
//     assignedProvider: [] | [string];
//     paymentId: [] | [string];
// };

// // Canister API client
// class EmergencyServiceClient {
//     private actor: any;
//     private agent: HttpAgent;

//     constructor(canisterId: string, host?: string) {
//         try {
//             this.agent = new HttpAgent({
//                 host: host || process.env.NEXT_PUBLIC_IC_HOST || "https://ic0.app",
//             });

//             // In development, we need to fetch the root key
//             if (process.env.NODE_ENV !== "production") {
//                 this.agent.fetchRootKey().catch(err => {
//                     console.warn("Unable to fetch root key. Error:", err);
//                 });
//             }

//             this.actor = Actor.createActor(idlFactory, {
//                 agent: this.agent,
//                 canisterId,
//             });
//         } catch (error) {
//             console.error("Error initializing canister client:", error);
//             throw new Error("Failed to initialize canister client. Check your environment configuration.");
//         }
//     }

//     // User Management Methods
//     async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
//         try {
//             return this.actor.createUser(userProfile);
//         } catch (error) {
//             console.error("Error creating user:", error);
//             throw error;
//         }
//     }

//     async getUserProfile(userId: any): Promise<UserProfile | null> {
//         try {
//             return this.actor.getUserProfile(userId);
//         } catch (error) {
//             console.error("Error getting user profile:", error);
//             throw error;
//         }
//     }

//     async updateUserProfile(userId: any, profile: Partial<UserProfile>): Promise<boolean> {
//         try {
//             return this.actor.updateUserProfile(userId, profile);
//         } catch (error) {
//             console.error("Error updating user profile:", error);
//             throw error;
//         }
//     }

//     // Payment Methods
//     async addPaymentMethod(userId: any, paymentMethod: PaymentMethod): Promise<boolean> {
//         try {
//             return this.actor.addPaymentMethod(userId, paymentMethod);
//         } catch (error) {
//             console.error("Error adding payment method:", error);
//             throw error;
//         }
//     }

//     async getUserPaymentMethods(userId: any): Promise<PaymentMethod[]> {
//         try {
//             return this.actor.getUserPaymentMethods(userId);
//         } catch (error) {
//             console.error("Error getting user payment methods:", error);
//             throw error;
//         }
//     }

//     // Emergency Call Methods
//     async initiateEmergencyCall(
//         userId: any,
//         serviceType: string,
//         description: string,
//         location: Location
//     ): Promise<{ok: string} | {err: string}> {
//         try {
//             return this.actor.initiateEmergencyCall(userId, serviceType, description, location);
//         } catch (error) {
//             console.error("Error initiating emergency call:", error);
//             throw error;
//         }
//     }

//     async getEmergencyCallDetails(callId: string): Promise<{ok: EmergencyCall} | {err: string}> {
//         try {
//             return this.actor.getEmergencyCallDetails(callId);
//         } catch (error) {
//             console.error("Error getting emergency call details:", error);
//             throw error;
//         }
//     }

//     async getUserEmergencyCalls(userId: any): Promise<EmergencyCall[]> {
//         try {
//             return this.actor.getUserEmergencyCalls(userId);
//         } catch (error) {
//             console.error("Error getting user emergency calls:", error);
//             throw error;
//         }
//     }

//     async getAllEmergencyCalls(): Promise<EmergencyCall[]> {
//         try {
//             return this.actor.getAllEmergencyCalls();
//         } catch (error) {
//             console.error("Error getting all emergency calls:", error);
//             throw error;
//         }
//     }

//     // Service Provider Methods
//     async getServiceProviders(trade?: string): Promise<any[]> {
//         try {
//             return this.actor.getServiceProviders(trade ? [trade] : []);
//         } catch (error) {
//             console.error("Error getting service providers:", error);
//             throw error;
//         }
//     }

//     // Admin Methods
//     async getSystemStats(): Promise<any> {
//         try {
//             return this.actor.getSystemStats();
//         } catch (error) {
//             console.error("Error getting system stats:", error);
//             throw error;
//         }
//     }
// }

// // Create and export the client
// let client: EmergencyServiceClient | null = null;

// export function initCanisterClient(canisterId: string, host?: string): EmergencyServiceClient {
//     if (!client) {
//         client = new EmergencyServiceClient(canisterId, host);
//     }
//     return client;
// }

// export function getCanisterClient(): EmergencyServiceClient {
//     if (!client) {
//         const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;
//         if (!canisterId) {
//             throw new Error("Canister ID not provided. Please set NEXT_PUBLIC_CANISTER_ID environment variable.");
//         }
//         client = new EmergencyServiceClient(canisterId);
//     }
//     return client;
// } 



////////////////////////////////////////////////////////////////////////////////////////////////


// import { Actor, HttpAgent } from "@dfinity/agent";
// // Import Principal as a type-only import to prevent build errors
// import type { Principal } from "@dfinity/principal";
// import { idlFactory } from "./idl";

// // Type definitions for the canister API
// export type UserId = Principal;

// export type MembershipTier =
//   | { Free: null }
//   | { Basic: null }
//   | { Standard: null }
//   | { Premium: null }
//   | { Professional: null }
//   | { Enterprise: null };

// export type PaymentMethod = {
//   cardType: string;
//   lastFourDigits: string;
//   tokenId: string;
// };

// export type UserProfile = {
//   id: UserId;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   membershipTier: MembershipTier;
//   paymentMethods: PaymentMethod[];
//   registrationDate: bigint;
//   lastUpdated: bigint;
// };

// export type Location = {
//   latitude: number;
//   longitude: number;
//   address: string;
// };

// export type EmergencyCallStatus =
//   | { Initiated: null }
//   | { Processing: null }
//   | { Assigned: null }
//   | { Completed: null }
//   | { Cancelled: null };

// export type EmergencyCall = {
//   id: string;
//   userId: UserId;
//   serviceType: string;
//   description: string;
//   location: Location;
//   timestamp: bigint;
//   status: EmergencyCallStatus;
//   assignedProvider: [] | [string];
//   paymentId: [] | [string];
// };

// // Canister API client
// class EmergencyServiceClient {
//   private actor: any;
//   private agent: HttpAgent;

//   constructor(canisterId: string, host?: string) {
//     try {
//       // Use local host in development, mainnet in production
//       const defaultHost = process.env.NODE_ENV === "production"
//         ? "https://ic0.app"
//         : "http://localhost:4943"; // Match your dfx replica port

//       this.agent = new HttpAgent({
//         host: host || process.env.NEXT_PUBLIC_IC_HOST || defaultHost,
//       });

//       // Fetch root key for local development to sync with replica
//       if (process.env.NODE_ENV !== "production") {
//         this.agent.fetchRootKey().catch(err => {
//           console.error("Failed to fetch root key for local replica. Ensure 'dfx start' is running:", err);
//           throw new Error("Root key fetch failed. Check local IC replica.");
//         });
//       }

//       this.actor = Actor.createActor(idlFactory, {
//         agent: this.agent,
//         canisterId,
//       });
//     } catch (error) {
//       console.error("Error initializing canister client:", error);
//       throw new Error("Failed to initialize canister client. Check your environment configuration.");
//     }
//   }

//   // User Management Methods
//   async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
//     try {
//       return await this.actor.createUser(userProfile);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//   }

//   async getUserProfile(userId: Principal): Promise<UserProfile | null> {
//     try {
//       return await this.actor.getUserProfile(userId);
//     } catch (error) {
//       console.error("Error getting user profile:", error);
//       throw error;
//     }
//   }

//   async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
//     try {
//       return await this.actor.updateUserProfile(userId, profile);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   }

//   async addPaymentMethod(userId: Principal, paymentMethod: PaymentMethod): Promise<boolean> {
//     try {
//       return await this.actor.addPaymentMethod(userId, paymentMethod);
//     } catch (error) {
//       console.error("Error adding payment method:", error);
//       throw error;
//     }
//   }

//   async getUserPaymentMethods(userId: Principal): Promise<PaymentMethod[]> {
//     try {
//       return await this.actor.getUserPaymentMethods(userId);
//     } catch (error) {
//       console.error("Error getting user payment methods:", error);
//       throw error;
//     }
//   }

//   // Emergency Call Methods
//   async initiateEmergencyCall(
//     userId: Principal,
//     serviceType: string,
//     description: string,
//     location: Location
//   ): Promise<{ ok: string } | { err: string }> {
//     try {
//       return await this.actor.initiateEmergencyCall(userId, serviceType, description, location);
//     } catch (error) {
//       console.error("Error initiating emergency call:", error);
//       throw error;
//     }
//   }

//   async getEmergencyCallDetails(callId: string): Promise<{ ok: EmergencyCall } | { err: string }> {
//     try {
//       return await this.actor.getEmergencyCallDetails(callId);
//     } catch (error) {
//       console.error("Error getting emergency call details:", error);
//       throw error;
//     }
//   }

//   async getUserEmergencyCalls(userId: Principal): Promise<EmergencyCall[]> {
//     try {
//       return await this.actor.getUserEmergencyCalls(userId);
//     } catch (error) {
//       console.error("Error getting user emergency calls:", error);
//       throw error;
//     }
//   }

//   async getAllEmergencyCalls(): Promise<EmergencyCall[]> {
//     try {
//       return await this.actor.getAllEmergencyCalls();
//     } catch (error) {
//       console.error("Error getting all emergency calls:", error);
//       throw error;
//     }
//   }

//   // Service Provider Methods
//   async getServiceProviders(trade?: string): Promise<any[]> {
//     try {
//       return await this.actor.getServiceProviders(trade ? [trade] : []);
//     } catch (error) {
//       console.error("Error getting service providers:", error);
//       throw error;
//     }
//   }

//   // Admin Methods
//   async getSystemStats(): Promise<any> {
//     try {
//       return await this.actor.getSystemStats();
//     } catch (error) {
//       console.error("Error getting system stats:", error);
//       throw error;
//     }
//   }
// }

// // Create and export the client
// let client: EmergencyServiceClient | null = null;

// export function initCanisterClient(canisterId: string, host?: string): EmergencyServiceClient {
//   if (!client) {
//     client = new EmergencyServiceClient(canisterId, host);
//   }
//   return client;
// }

// export function getCanisterClient(): EmergencyServiceClient {
//   if (!client) {
//     const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "bd3sg-teaaa-aaaaa-qaaba-cai"; // Default to your canister ID
//     if (!canisterId) {
//       throw new Error("Canister ID not provided. Please set NEXT_PUBLIC_CANISTER_ID environment variable.");
//     }
//     client = new EmergencyServiceClient(canisterId);
//   }
//   return client;
// }















///////////////////////////////////////////////////////



// // src/lib/canister/index.ts
// import { Actor, HttpAgent } from "@dfinity/agent";
// import type { Principal } from "@dfinity/principal";
// import { idlFactory } from "./idl";

// export type UserId = Principal;

// export type MembershipTier =
//   | { Free: null }
//   | { Basic: null }
//   | { Standard: null }
//   | { Premium: null }
//   | { Professional: null }
//   | { Enterprise: null };

// export type PaymentMethod = {
//   cardType: string;
//   lastFourDigits: string;
//   tokenId: string;
// };

// // Updated UserProfile to match optional fields
// export type UserProfile = {
//   id: UserId;
//   name: string | null; // Changed to optional
//   email: string | null; // Changed to optional
//   phone: string | null; // Changed to optional
//   address: string | null; // Changed to optional
//   membershipTier: MembershipTier | null; // Changed to optional
//   paymentMethods: PaymentMethod[];
//   registrationDate: bigint;
//   lastUpdated: bigint;
// };

// export type Location = {
//   latitude: number;
//   longitude: number;
//   address: string;
// };

// export type EmergencyCallStatus =
//   | { Initiated: null }
//   | { Processing: null }
//   | { Assigned: null }
//   | { Completed: null }
//   | { Cancelled: null };

// export type EmergencyCall = {
//   id: string;
//   userId: UserId;
//   serviceType: string;
//   description: string;
//   location: Location;
//   timestamp: bigint;
//   status: EmergencyCallStatus;
//   assignedProvider: [] | [string];
//   paymentId: [] | [string];
// };

// class EmergencyServiceClient {
//   private actor: any;
//   private agent: HttpAgent;

//   constructor(canisterId: string, host?: string) {
//     try {
//       const defaultHost = process.env.NODE_ENV === "production"
//         ? "https://ic0.app"
//         : "http://localhost:4943";
//       this.agent = new HttpAgent({
//         host: host || process.env.NEXT_PUBLIC_IC_HOST || defaultHost,
//       });

//       if (process.env.NODE_ENV !== "production") {
//         this.agent.fetchRootKey().catch(err => {
//           console.error("Failed to fetch root key:", err);
//           throw new Error("Root key fetch failed. Check local IC replica.");
//         });
//       }

//       this.actor = Actor.createActor(idlFactory, {
//         agent: this.agent,
//         canisterId,
//       });
//     } catch (error) {
//       console.error("Error initializing canister client:", error);
//       throw new Error("Failed to initialize canister client.");
//     }
//   }

//   async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
//     try {
//       // Wrap optional fields in arrays
//       const formattedProfile = {
//         name: userProfile.name ? [userProfile.name] : [],
//         email: userProfile.email ? [userProfile.email] : [],
//         phone: userProfile.phone ? [userProfile.phone] : [],
//         address: userProfile.address ? [userProfile.address] : [],
//         membershipTier: userProfile.membershipTier ? [userProfile.membershipTier] : [],
//         paymentMethods: userProfile.paymentMethods,
//       };
//       return await this.actor.createUser(formattedProfile);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//   }

//   async getUserProfile(userId: Principal): Promise<UserProfile | null> {
//     try {
//       const result = await this.actor.getUserProfile(userId);
//       if (!result) return null;
//       // Convert optional fields from arrays to plain values
//       return {
//         id: result.id,
//         name: result.name[0] || null,
//         email: result.email[0] || null,
//         phone: result.phone[0] || null,
//         address: result.address[0] || null,
//         membershipTier: result.membershipTier[0] || null,
//         paymentMethods: result.paymentMethods,
//         registrationDate: result.registrationDate,
//         lastUpdated: result.lastUpdated,
//       };
//     } catch (error) {
//       console.error("Error getting user profile:", error);
//       throw error;
//     }
//   }

//   async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
//     try {
//       // Wrap optional fields in arrays
//       const formattedProfile = {
//         name: profile.name !== undefined ? [profile.name ?? ""] : [],
//         email: profile.email !== undefined ? [profile.email ?? ""] : [],
//         phone: profile.phone !== undefined ? [profile.phone ?? ""] : [],
//         address: profile.address !== undefined ? [profile.address ?? ""] : [],
//         membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
//         paymentMethods: profile.paymentMethods !== undefined ? profile.paymentMethods : [],
//       };
//       return await this.actor.updateUserProfile(userId, formattedProfile);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   }

//   async addPaymentMethod(userId: Principal, paymentMethod: PaymentMethod): Promise<boolean> {
//     try {
//       return await this.actor.addPaymentMethod(userId, paymentMethod);
//     } catch (error) {
//       console.error("Error adding payment method:", error);
//       throw error;
//     }
//   }

//   async getUserPaymentMethods(userId: Principal): Promise<PaymentMethod[]> {
//     try {
//       return await this.actor.getUserPaymentMethods(userId);
//     } catch (error) {
//       console.error("Error getting user payment methods:", error);
//       throw error;
//     }
//   }

//   // Remaining methods unchanged for brevity...
// }

// let client: EmergencyServiceClient | null = null;

// export function initCanisterClient(canisterId: string, host?: string): EmergencyServiceClient {
//   if (!client) {
//     client = new EmergencyServiceClient(canisterId, host);
//   }
//   return client;
// }

// export function getCanisterClient(): EmergencyServiceClient {
//   if (!client) {
//     const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
//     if (!canisterId) {
//       throw new Error("Canister ID not provided.");
//     }
//     client = new EmergencyServiceClient(canisterId);
//   }
//   return client;
// }




// // src/lib/canister/index.ts
// import { Actor, HttpAgent } from "@dfinity/agent";
// import type { Principal } from "@dfinity/principal";
// import { idlFactory } from "./idl";

// export type UserId = Principal;

// export type MembershipTier =
//   | { Free: null }
//   | { Basic: null }
//   | { Standard: null }
//   | { Premium: null }
//   | { Professional: null }
//   | { Enterprise: null };

// export type PaymentMethod = {
//   cardType: string;
//   lastFourDigits: string;
//   tokenId: string;
// };

// // export type UserProfile = {
// //   id: UserId;
// //   name: string | null;
// //   email: string | null;
// //   phone: string | null;
// //   address: string | null;
// //   membershipTier: MembershipTier | null;
// //   paymentMethods: PaymentMethod[];
// //   registrationDate: bigint;
// //   lastUpdated: bigint;
// // };

// export type UserProfile = {
//     id: UserId;
//     name: string;         // Non-optional
//     email: string;        // Non-optional
//     phone: string;        // Non-optional
//     address: string;     // Non-optional
//     membershipTier: MembershipTier; // Non-optional
//     paymentMethods: PaymentMethod[];
//     registrationDate: bigint;
//     lastUpdated: bigint;
//   };


// export type Location = {
//   latitude: number;
//   longitude: number;
//   address: string;
// };

// export type EmergencyCallStatus =
//   | { Initiated: null }
//   | { Processing: null }
//   | { Assigned: null }
//   | { Completed: null }
//   | { Cancelled: null };

// export type EmergencyCall = {
//   id: string;
//   userId: UserId;
//   serviceType: string;
//   description: string;
//   location: Location;
//   timestamp: bigint;
//   status: EmergencyCallStatus;
//   assignedProvider: [] | [string];
//   paymentId: [] | [string];
// };

// class EmergencyServiceClient {
//   private actor: any;
//   private agent: HttpAgent;

//   constructor(canisterId: string, host?: string) {
//     try {
//       const defaultHost = process.env.NODE_ENV === "production"
//         ? "https://ic0.app"
//         : "http://localhost:4943";
//       this.agent = new HttpAgent({
//         host: host || process.env.NEXT_PUBLIC_IC_HOST || defaultHost,
//       });

//       if (process.env.NODE_ENV !== "production") {
//         this.agent.fetchRootKey().catch(err => {
//           console.error("Failed to fetch root key:", err);
//           throw new Error("Root key fetch failed. Check local IC replica.");
//         });
//       }

//       this.actor = Actor.createActor(idlFactory, {
//         agent: this.agent,
//         canisterId,
//       });
//     } catch (error) {
//       console.error("Error initializing canister client:", error);
//       throw new Error("Failed to initialize canister client.");
//     }
//   }

// //   async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
// //     try {
// //       const formattedProfile = {
// //         name: userProfile.name ? [userProfile.name] : [],
// //         email: userProfile.email ? [userProfile.email] : [],
// //         phone: userProfile.phone ? [userProfile.phone] : [],
// //         address: userProfile.address ? [userProfile.address] : [],
// //         membershipTier: userProfile.membershipTier ? [userProfile.membershipTier] : [],
// //         paymentMethods: userProfile.paymentMethods,
// //       };
// //       return await this.actor.createUser(formattedProfile);
// //     } catch (error) {
// //       console.error("Error creating user:", error);
// //       throw error;
// //     }
// //   }

// async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
//     try {
//       // Validate required fields first
//       if (!userProfile.name || !userProfile.email || !userProfile.phone || !userProfile.address || !userProfile.membershipTier) {
//         throw new Error("Missing required user profile fields");
//       }
  
//       const formattedProfile = {
//         name: userProfile.name, // Direct string (non-optional)
//         email: userProfile.email,
//         phone: userProfile.phone,
//         address: userProfile.address,
//         membershipTier: userProfile.membershipTier, // Direct variant
//         paymentMethods: userProfile.paymentMethods,
//       };
      
//       return await this.actor.createUser(formattedProfile);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//   }


//   async getUserProfile(userId: Principal): Promise<UserProfile | null> {
//     try {
//       const result = await this.actor.getUserProfile(userId);
//       // Check if result is null, undefined, or not an object
//       if (!result || typeof result !== "object") {
//         return null;
//       }
//       // Safely unwrap optional fields, defaulting to null if not present
//       return {
//         id: result.id ?? userId, // Fallback to input userId if missing
//         name: Array.isArray(result.name) && result.name.length > 0 ? result.name[0] : null,
//         email: Array.isArray(result.email) && result.email.length > 0 ? result.email[0] : null,
//         phone: Array.isArray(result.phone) && result.phone.length > 0 ? result.phone[0] : null,
//         address: Array.isArray(result.address) && result.address.length > 0 ? result.address[0] : null,
//         membershipTier: Array.isArray(result.membershipTier) && result.membershipTier.length > 0 ? result.membershipTier[0] : null,
//         paymentMethods: Array.isArray(result.paymentMethods) ? result.paymentMethods : [],
//         registrationDate: result.registrationDate ?? BigInt(0),
//         lastUpdated: result.lastUpdated ?? BigInt(0),
//       };
//     } catch (error) {
//       console.error("Error getting user profile:", error);
//       throw error;
//     }
//   }

// //   async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
// //     try {
// //       const formattedProfile = {
// //         name: profile.name !== undefined ? [profile.name ?? ""] : [],
// //         email: profile.email !== undefined ? [profile.email ?? ""] : [],
// //         phone: profile.phone !== undefined ? [profile.phone ?? ""] : [],
// //         address: profile.address !== undefined ? [profile.address ?? ""] : [],
// //         membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
// //         paymentMethods: profile.paymentMethods !== undefined ? profile.paymentMethods : [],
// //       };
// //       return await this.actor.updateUserProfile(userId, formattedProfile);
// //     } catch (error) {
// //       console.error("Error updating user profile:", error);
// //       throw error;
// //     }
// //   }


// // async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
// //     try {
// //       const formattedProfile = {
// //         name: profile.name ?? "", // Fallback to empty string
// //         email: profile.email ?? "",
// //         phone: profile.phone ?? "",
// //         address: profile.address ?? "",
// //         membershipTier: profile.membershipTier ?? { Free: null }, // Default tier
// //         paymentMethods: profile.paymentMethods ?? [],
// //       };
// //       return await this.actor.updateUserProfile(userId, formattedProfile);
// //     } catch (error) {
// //       console.error("Error updating user profile:", error);
// //       throw error;
// //     }
// //   }


// async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
//     try {
//       // Match the Motoko update profile type: {name: ?Text; email: ?Text; ...}
//       const formattedProfile = {
//         name: profile.name !== undefined ? [profile.name] : [], // Wrap in array for opt
//         email: profile.email !== undefined ? [profile.email] : [],
//         phone: profile.phone !== undefined ? [profile.phone] : [],
//         address: profile.address !== undefined ? [profile.address] : [],
//         membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
//         paymentMethods: profile.paymentMethods !== undefined ? [profile.paymentMethods] : [],
//       };
      
//       return await this.actor.updateUserProfile(userId, formattedProfile);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   }

//   async addPaymentMethod(userId: Principal, paymentMethod: PaymentMethod): Promise<boolean> {
//     try {
//       return await this.actor.addPaymentMethod(userId, paymentMethod);
//     } catch (error) {
//       console.error("Error adding payment method:", error);
//       throw error;
//     }
//   }

//   async getUserPaymentMethods(userId: Principal): Promise<PaymentMethod[]> {
//     try {
//       return await this.actor.getUserPaymentMethods(userId);
//     } catch (error) {
//       console.error("Error getting user payment methods:", error);
//       throw error;
//     }
//   }

//   // Remaining methods unchanged...
// }

// let client: EmergencyServiceClient | null = null;

// export function initCanisterClient(canisterId: string, host?: string): EmergencyServiceClient {
//   if (!client) {
//     client = new EmergencyServiceClient(canisterId, host);
//   }
//   return client;
// }

// export function getCanisterClient(): EmergencyServiceClient {
//   if (!client) {
//     const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
//     if (!canisterId) {
//       throw new Error("Canister ID not provided.");
//     }
//     client = new EmergencyServiceClient(canisterId);
//   }
//   return client;
// }






///////////////////////////////


// src/lib/canister/index.ts
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "./idl";
import type { EmergencyService } from "./emergencyServiceInterface"; // Adjust the import path

// type InterfaceFactory = ({ IDL }: { IDL: typeof import("@dfinity/candid").IDL }) => unknown;

export type CreateUserInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipTier: MembershipTier;
};

export type UserId = Principal;

export type MembershipTier =
  | { Free: null }
  | { Basic: null }
  | { Standard: null }
  | { Premium: null }
  | { Professional: null }
  | { Enterprise: null };

export type PaymentMethod = {
  cardType: string;
  lastFourDigits: string;
  tokenId: string;
};

// export type UserProfile = {
//   id: UserId;
//   name: string | null;
//   email: string | null;
//   phone: string | null;
//   address: string | null;
//   membershipTier: MembershipTier | null;
//   paymentMethods: PaymentMethod[];
//   registrationDate: bigint;
//   lastUpdated: bigint;
// };

export type UpdateUserProfileInput = {
  name: [] | [string];
  email: [] | [string];
  phone: [] | [string];
  address: [] | [string];
  membershipTier: [] | [MembershipTier];
};

export type UserProfile = {
    id: UserId;
    name: string;         // Non-optional
    email: string;        // Non-optional
    phone: string;        // Non-optional
    address: string;     // Non-optional
    membershipTier: MembershipTier; // Non-optional
    paymentMethods: PaymentMethod[];
    registrationDate: bigint;
    lastUpdated: bigint;
  };


export type Location = {
  latitude: number;
  longitude: number;
  address: string;
};

export type EmergencyCallStatus =
  | { Initiated: null }
  | { Processing: null }
  | { Assigned: null }
  | { Completed: null }
  | { Cancelled: null };

export type EmergencyCall = {
  id: string;
  userId: UserId;
  serviceType: string;
  description: string;
  location: Location;
  timestamp: bigint;
  status: EmergencyCallStatus;
  assignedProvider: [] | [string];
  paymentId: [] | [string];
};

// class EmergencyServiceClient {
//   private actor: any;
//   private agent: HttpAgent;

//   constructor(canisterId: string, host?: string) {
//     try {
//       const defaultHost = process.env.NODE_ENV === "production"
//         ? "https://ic0.app"
//         : "http://localhost:4943";
//       this.agent = new HttpAgent({
//         host: host || process.env.NEXT_PUBLIC_IC_HOST || defaultHost,
//       });

//       if (process.env.NODE_ENV !== "production") {
//         this.agent.fetchRootKey().catch(err => {
//           console.error("Failed to fetch root key:", err);
//           throw new Error("Root key fetch failed. Check local IC replica.");
//         });
//       }

//       this.actor = Actor.createActor(idlFactory, {
//         agent: this.agent,
//         canisterId,
//       });
//     } catch (error) {
//       console.error("Error initializing canister client:", error);
//       throw new Error("Failed to initialize canister client.");
//     }
//   }

// //   async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
// //     try {
// //       const formattedProfile = {
// //         name: userProfile.name ? [userProfile.name] : [],
// //         email: userProfile.email ? [userProfile.email] : [],
// //         phone: userProfile.phone ? [userProfile.phone] : [],
// //         address: userProfile.address ? [userProfile.address] : [],
// //         membershipTier: userProfile.membershipTier ? [userProfile.membershipTier] : [],
// //         paymentMethods: userProfile.paymentMethods,
// //       };
// //       return await this.actor.createUser(formattedProfile);
// //     } catch (error) {
// //       console.error("Error creating user:", error);
// //       throw error;
// //     }
// //   }

// async createUser(userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">): Promise<UserId> {
//     try {
//       // Validate required fields first
//       if (!userProfile.name || !userProfile.email || !userProfile.phone || !userProfile.address || !userProfile.membershipTier) {
//         throw new Error("Missing required user profile fields");
//       }
  
//       const formattedProfile = {
//         name: userProfile.name, // Direct string (non-optional)
//         email: userProfile.email,
//         phone: userProfile.phone,
//         address: userProfile.address,
//         membershipTier: userProfile.membershipTier, // Direct variant
//         paymentMethods: userProfile.paymentMethods,
//       };
      
//       return await this.actor.createUser(formattedProfile);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//   }


//   async getUserProfile(userId: Principal): Promise<UserProfile | null> {
//     try {
//       const result = await this.actor.getUserProfile(userId);
//       // Check if result is null, undefined, or not an object
//       if (!result || typeof result !== "object") {
//         return null;
//       }
//       // Safely unwrap optional fields, defaulting to null if not present
//       return {
//         id: result.id ?? userId, // Fallback to input userId if missing
//         name: Array.isArray(result.name) && result.name.length > 0 ? result.name[0] : null,
//         email: Array.isArray(result.email) && result.email.length > 0 ? result.email[0] : null,
//         phone: Array.isArray(result.phone) && result.phone.length > 0 ? result.phone[0] : null,
//         address: Array.isArray(result.address) && result.address.length > 0 ? result.address[0] : null,
//         membershipTier: Array.isArray(result.membershipTier) && result.membershipTier.length > 0 ? result.membershipTier[0] : null,
//         paymentMethods: Array.isArray(result.paymentMethods) ? result.paymentMethods : [],
//         registrationDate: result.registrationDate ?? BigInt(0),
//         lastUpdated: result.lastUpdated ?? BigInt(0),
//       };
//     } catch (error) {
//       console.error("Error getting user profile:", error);
//       throw error;
//     }
//   }

// //   async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
// //     try {
// //       const formattedProfile = {
// //         name: profile.name !== undefined ? [profile.name ?? ""] : [],
// //         email: profile.email !== undefined ? [profile.email ?? ""] : [],
// //         phone: profile.phone !== undefined ? [profile.phone ?? ""] : [],
// //         address: profile.address !== undefined ? [profile.address ?? ""] : [],
// //         membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
// //         paymentMethods: profile.paymentMethods !== undefined ? profile.paymentMethods : [],
// //       };
// //       return await this.actor.updateUserProfile(userId, formattedProfile);
// //     } catch (error) {
// //       console.error("Error updating user profile:", error);
// //       throw error;
// //     }
// //   }


// // async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
// //     try {
// //       const formattedProfile = {
// //         name: profile.name ?? "", // Fallback to empty string
// //         email: profile.email ?? "",
// //         phone: profile.phone ?? "",
// //         address: profile.address ?? "",
// //         membershipTier: profile.membershipTier ?? { Free: null }, // Default tier
// //         paymentMethods: profile.paymentMethods ?? [],
// //       };
// //       return await this.actor.updateUserProfile(userId, formattedProfile);
// //     } catch (error) {
// //       console.error("Error updating user profile:", error);
// //       throw error;
// //     }
// //   }


// async updateUserProfile(userId: Principal, profile: Partial<UserProfile>): Promise<boolean> {
//     try {
//       // Match the Motoko update profile type: {name: ?Text; email: ?Text; ...}
//       const formattedProfile = {
//         name: profile.name !== undefined ? [profile.name] : [], // Wrap in array for opt
//         email: profile.email !== undefined ? [profile.email] : [],
//         phone: profile.phone !== undefined ? [profile.phone] : [],
//         address: profile.address !== undefined ? [profile.address] : [],
//         membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
//         paymentMethods: profile.paymentMethods !== undefined ? [profile.paymentMethods] : [],
//       };
      
//       return await this.actor.updateUserProfile(userId, formattedProfile);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   }

//   async addPaymentMethod(userId: Principal, paymentMethod: PaymentMethod): Promise<boolean> {
//     try {
//       return await this.actor.addPaymentMethod(userId, paymentMethod);
//     } catch (error) {
//       console.error("Error adding payment method:", error);
//       throw error;
//     }
//   }




export class EmergencyServiceClient {
  // private actor: any;
  private actor: EmergencyService;
  private agent: HttpAgent;

  constructor(canisterId: string, host?: string) {
    try {
      const defaultHost =
        process.env.NODE_ENV === "production"
          ? "https://ic0.app"
          : "http://localhost:4943";
      this.agent = new HttpAgent({
        host: host || process.env.NEXT_PUBLIC_IC_HOST || defaultHost,
      });

      if (process.env.NODE_ENV !== "production") {
        this.agent.fetchRootKey().catch((err) => {
          console.error("Failed to fetch root key:", err);
          throw new Error("Root key fetch failed. Check local IC replica.");
        });
      }

      this.actor = Actor.createActor(idlFactory , {
        // this.actor = Actor.createActor(idlFactory as unknown as InterfaceFactory, {

        // this.actor = Actor.createActor(idlFactory as unknown as InterfaceFactory, {

        // this.actor = Actor.createActor<EmergencyService>(idlFactory, {
        agent: this.agent,
        canisterId,
      }) as EmergencyService;
      
    } catch (error) {
      console.error("Error initializing canister client:", error);
      throw new Error("Failed to initialize canister client.");
    }
  }

  // async createUser(
  //   userId: Principal,
  //   userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">
  // ): Promise<UserId> {
  //   try {
  //     if (
  //       !userProfile.name ||
  //       !userProfile.email ||
  //       !userProfile.phone ||
  //       !userProfile.address ||
  //       !userProfile.membershipTier
  //     ) {
  //       throw new Error("Missing required user profile fields");
  //     }

  //     const formattedProfile = {
  //       name: userProfile.name,
  //       email: userProfile.email,
  //       phone: userProfile.phone,
  //       address: userProfile.address,
  //       membershipTier: userProfile.membershipTier,
  //     };

  //     return await this.actor.createUser(userId, formattedProfile);
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     throw error;
  //   }
  // }

  // async getUserProfile(userId: Principal): Promise<UserProfile | null> {
  //   try {
  //     const result = await this.actor.getUserProfile(userId);
  //     if (!result) return null;
  //     return {
  //       id: userId,
  //       name: result.name,
  //       email: result.email,
  //       phone: result.phone,
  //       address: result.address,
  //       membershipTier: result.membershipTier,
  //       paymentMethods: result.paymentMethods || [],
  //       registrationDate: result.registrationDate,
  //       lastUpdated: result.lastUpdated,
  //     };
  //   } catch (error) {
  //     console.error("Error getting user profile:", error);
  //     throw error;
  //   }
  // }


  async createUser(
    userId: Principal,
    userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">
    // userProfile: CreateUserInput
  ): Promise<UserId> {
    try {
      if (
        !userProfile.name ||
        !userProfile.email ||
        !userProfile.phone ||
        !userProfile.address ||
        !userProfile.membershipTier
      ) {
        throw new Error("Missing required user profile fields");
      }

      // const UserProfile = IDL.Record({
      //   'id': UserId,
      //   'name': IDL.Text,
      //   'email': IDL.Text,
      //   'phone': IDL.Text,
      //   'address': IDL.Text,
      //   'membershipTier': MembershipTier,
      //   'paymentMethods': IDL.Vec(PaymentMethod),
      //   'registrationDate': IDL.Int,
      //   'lastUpdated': IDL.Int,
      // });
  
      // const formattedProfile = {
      //   name: userProfile.name,
      //   email: userProfile.email,
      //   phone: userProfile.phone,
      //   address: userProfile.address,
      //   membershipTier: userProfile.membershipTier,
      // };
      
      const formattedProfile = {
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        membershipTier: userProfile.membershipTier,
        paymentMethods: userProfile.paymentMethods || [],
      };


      console.log("Sending createUser payload:", formattedProfile);
      const result = await this.actor.createUser(userId, formattedProfile);
      console.log("createUser result:", result);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }


// working code
  // async getUserProfile(userId: Principal): Promise<UserProfile | null> {
  //   console.log("Attempting to get user profile for:", userId.toText());
  //   try {
  //     const result = await this.actor.getUserProfile(userId);
  //     console.log("Raw result from canister:", result);
  //     if (result === null || result === undefined || !result.length) {
  //       console.log("No user found for:", userId.toText());
  //       return null;
  //     }
  //     const profile = result[0]; // Motoko returns an optional as [UserProfile] or []
  //     return {
  //       id: userId,
  //       name: profile.name,
  //       email: profile.email,
  //       phone: profile.phone,
  //       address: profile.address,
  //       membershipTier: profile.membershipTier,
  //       paymentMethods: profile.paymentMethods || [],
  //       registrationDate: profile.registrationDate,
  //       lastUpdated: profile.lastUpdated,
  //     };
  //   } catch (error) {
  //     console.error("Error getting user profile:", error);
  //     throw error;
  //   }
  // }


  // Again Working code with optional fields handling Man...

  async getUserProfile(userId: Principal): Promise<UserProfile | null> {
    console.log("Attempting to get user profile for:", userId.toText());
    try {
      const result = await this.actor.getUserProfile(userId);
      console.log("Raw result from canister:", result);
      if (result === null || result === undefined || !result.length) {
        console.log("No user found for:", userId.toText());
        return null;
      }
      const profile = result[0]; // Motoko returns an optional as [UserProfile] or []
      return {
        id: userId,
        name: profile.name || "Unknown", // Fallback if null
        email: profile.email || "Unknown",
        phone: profile.phone || "Unknown",
        address: profile.address || "Unknown",
        membershipTier: profile.membershipTier || { Free: null }, // Default to Free tier
        paymentMethods: profile.paymentMethods || [],
        registrationDate: profile.registrationDate || BigInt(0),
        lastUpdated: profile.lastUpdated || BigInt(0),
      };
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

  async updateUserProfile(
    userId: Principal,
    profile: Partial<Omit<UserProfile, "id" | "registrationDate" | "lastUpdated">>
  ): Promise<boolean> {
    try {
      const formattedProfile:UpdateUserProfileInput = {
        name: profile.name !== undefined ? [profile.name] : [],
        email: profile.email !== undefined ? [profile.email] : [],
        phone: profile.phone !== undefined ? [profile.phone] : [],
        address: profile.address !== undefined ? [profile.address] : [],
        membershipTier: profile.membershipTier !== undefined ? [profile.membershipTier] : [],
        // paymentMethods: profile.paymentMethods !== undefined ? [profile.paymentMethods] : [],
      };
      return await this.actor.updateUserProfile(userId, formattedProfile);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  async addPaymentMethod(userId: Principal, paymentMethod: PaymentMethod): Promise<boolean> {
    try {
      return await this.actor.addPaymentMethod(userId, paymentMethod);
    } catch (error) {
      console.error("Error adding payment method:", error);
      throw error;
    }
  }

  async getUserPaymentMethods(userId: Principal): Promise<PaymentMethod[]> {
    try {
      return await this.actor.getUserPaymentMethods(userId);
    } catch (error) {
      console.error("Error getting user payment methods:", error);
      throw error;
    }
  }

  // Remaining methods unchanged...
}

let client: EmergencyServiceClient | null = null;

export function initCanisterClient(canisterId: string, host?: string): EmergencyServiceClient {
  if (!client) {
    client = new EmergencyServiceClient(canisterId, host);
  }
  return client;
}

export function getCanisterClient(): EmergencyServiceClient {
  if (!client) {
    const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
    if (!canisterId) {
      throw new Error("Canister ID not provided.");
    }
    client = new EmergencyServiceClient(canisterId);
  }
  return client;
}








