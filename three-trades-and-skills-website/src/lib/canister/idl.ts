// import { IDL  } from "@dfinity/candid";

// export const idlFactory = ({ IDL }) => {
//   const UserId = IDL.Principal;
// import { InterfaceFactory } from "@dfinity/agent";
// import type { InterfaceFactory } from "@dfinity/agent";

// import { IDL } from "@dfinity/candid/lib/cjs/idl";

// import { IDL } from "@dfinity/candid/lib/cjs/idl"; // Explicit CJS path

// import { IDL } from "@dfinity/candid";
  // 
// export const idlFactory = function (args) {
  // export const idlFactory = function (args: { IDL: typeof IDL }) {
// export const idlFactory = ({ IDL}) => {
  // export const idlFactory = ({ IDL }: { IDL: typeof import('@dfinity/candid').IDL }) => {
    // export const idlFactory = ({ IDL }: { IDL: typeof IDL }) => {
      // const IDL = args.IDL;

    // export const idlFactory = ({ IDL }: { IDL: typeof import("@dfinity/candid/lib/cjs/idl").IDL }) => {

    // export const idlFactory: InterfaceFactory = ({ IDL }) => {

// import { IDL } from "@dfinity/candid";

// export const idlFactory = function (args: { IDL: typeof IDL }) {
//   const idl = args.IDL;
//   // const UserId = IDL.Principal;
//   const UserId = idl.Principal;


// import type { InterfaceFactory } from "@dfinity/agent";
import type { InterfaceFactory } from "@dfinity/candid/lib/cjs/idl";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDL } from "@dfinity/candid";

export const idlFactory: InterfaceFactory = ({ IDL }) => {
  const UserId = IDL.Principal;

  // const MembershipTier = IDL.Variant({
  //   'Free': IDL.Null,
  //   'Basic': IDL.Null,
  //   'Standard': IDL.Null,
  //   'Premium': IDL.Null,
  //   'Professional': IDL.Null,
  //   'Enterprise': IDL.Null,
  // });
  
  // const PaymentMethod = IDL.Record({
  //   'cardType': IDL.Text,
  //   'lastFourDigits': IDL.Text,
  //   'tokenId': IDL.Text, 
  // });


  
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

  const MembershipTier = IDL.Variant({
    'Free': IDL.Null,
    'Basic': IDL.Null,
    'Standard': IDL.Null,
    'Premium': IDL.Null,
    'Professional': IDL.Null,
    'Enterprise': IDL.Null,
  });

  const PaymentMethod = IDL.Record({
    'cardType': IDL.Text,
    'lastFourDigits': IDL.Text,
    'tokenId': IDL.Text,
  });

  const UserProfile = IDL.Record({
    'id': UserId,
    'name': IDL.Text,
    'email': IDL.Text,
    'phone': IDL.Text,
    'address': IDL.Text,
    'membershipTier': MembershipTier,
    'paymentMethods': IDL.Vec(PaymentMethod),
    'registrationDate': IDL.Int,
    'lastUpdated': IDL.Int,
  });
  
  const Location = IDL.Record({
    'latitude': IDL.Float64,
    'longitude': IDL.Float64,
    'address': IDL.Text,
  });
  
  const EmergencyCallStatus = IDL.Variant({
    'Initiated': IDL.Null,
    'Processing': IDL.Null,
    'Assigned': IDL.Null,
    'Completed': IDL.Null,
    'Cancelled': IDL.Null,
  });
  
  const EmergencyCall = IDL.Record({
    'id': IDL.Text,
    'userId': UserId,
    'serviceType': IDL.Text,
    'description': IDL.Text,
    'location': Location,
    'timestamp': IDL.Int,
    'status': EmergencyCallStatus,
    'assignedProvider': IDL.Opt(IDL.Text),
    'paymentId': IDL.Opt(IDL.Text),
  });
  
  const ServiceProvider = IDL.Record({
    'id': IDL.Text,
    'name': IDL.Text,
    'trade': IDL.Text,
    'phone': IDL.Text,
    'availability': IDL.Bool,
    'rating': IDL.Float64,
    'responseTime': IDL.Int,
  });
  
  const Result = IDL.Variant({
    'ok': IDL.Text,
    'err': IDL.Text,
  });
  
  const Result_1 = IDL.Variant({
    'ok': EmergencyCall,
    'err': IDL.Text,
  });
  
  const SystemStats = IDL.Record({
    'totalUsers': IDL.Nat,
    'totalServiceProviders': IDL.Nat,
    'totalEmergencyCalls': IDL.Nat,
    'activeEmergencyCalls': IDL.Nat,
    'totalPayments': IDL.Nat,
  });
  
  // return IDL.Service({
  //   // User Management
  //   'createUser': IDL.Func([IDL.Record({
  //     'name': IDL.Text,
  //     'email': IDL.Text,
  //     'phone': IDL.Text,
  //     'address': IDL.Text,
  //     'membershipTier': MembershipTier,
  //   })], [UserId], []),
    
  //   'getUserProfile': IDL.Func([UserId], [IDL.Opt(UserProfile)], ['query']),
    
  //   'updateUserProfile': IDL.Func([
  //     UserId,
  //     IDL.Record({
  //       'name': IDL.Opt(IDL.Text),
  //       'email': IDL.Opt(IDL.Text),
  //       'phone': IDL.Opt(IDL.Text),
  //       'address': IDL.Opt(IDL.Text),
  //       'membershipTier': IDL.Opt(MembershipTier),
  //     }),
  //   ], [IDL.Bool], []),
    
  //   // Payment Methods
  //   'addPaymentMethod': IDL.Func([
  //     UserId,
  //     PaymentMethod,
  //   ], [IDL.Bool], []),

  return IDL.Service({
    'createUser': IDL.Func(
      [
        UserId, // First argument: userId
        IDL.Record({
          'name': IDL.Text,
          'email': IDL.Text,
          'phone': IDL.Text,
          'address': IDL.Text,
          'membershipTier': MembershipTier,
        }),
      ],
      [UserId],
      []
    ),
    'getUserProfile': IDL.Func([UserId], [IDL.Opt(UserProfile)], ['query']),
    'updateUserProfile': IDL.Func(
      [
        UserId,
        IDL.Record({
          'name': IDL.Opt(IDL.Text),
          'email': IDL.Opt(IDL.Text),
          'phone': IDL.Opt(IDL.Text),
          'address': IDL.Opt(IDL.Text),
          'membershipTier': IDL.Opt(MembershipTier),
        }),
      ],
      [IDL.Bool],
      []
    ),
    'addPaymentMethod': IDL.Func([UserId, PaymentMethod], [IDL.Bool], []),
    
    'getUserPaymentMethods': IDL.Func([
      UserId,
    ], [IDL.Vec(PaymentMethod)], ['query']),
    
    // Emergency Call Functions
    'initiateEmergencyCall': IDL.Func([
      UserId,
      IDL.Text,
      IDL.Text,
      Location,
    ], [Result], []),
    
    'getEmergencyCallDetails': IDL.Func([
      IDL.Text,
    ], [Result_1], ['query']),
    
    'getUserEmergencyCalls': IDL.Func([
      UserId,
    ], [IDL.Vec(EmergencyCall)], ['query']),
    
    'getAllEmergencyCalls': IDL.Func(
      [], [IDL.Vec(EmergencyCall)], ['query']
    ),
    
    // Service Provider Functions
    'getServiceProviders': IDL.Func([
      IDL.Opt(IDL.Text),
    ], [IDL.Vec(ServiceProvider)], ['query']),
    
    // Admin Functions
    'getSystemStats': IDL.Func(
      [], [SystemStats], ['query']
    ),
  });
}; 