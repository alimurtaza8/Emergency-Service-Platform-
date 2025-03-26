// Import libraries
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
// import SquarePayment "modules/SquarePayment";
import SquarePayment "modules/SquarePayment";
import MappingService "modules/MappingService";
import NotificationService "modules/NotificationService";
// import delay "mo:base/Delay";


// User and Membership Management
actor EmergencyServicePlatform {
  // Initialize our service modules
    private let squareConnector = SquarePayment.SquareConnector("YOUR_SQUARE_API_KEY", "YOUR_LOCATION_ID");
    private let mappingEngine = MappingService.MappingEngine();
    private let notificationManager = NotificationService.NotificationManager();

    // Types
    public type UserId = Principal;
    
    public type MembershipTier = {
        #Free;
        #Basic;
        #Standard;
        #Premium;
        #Professional;
        #Enterprise;
    };

    public type PaymentMethod = {
        cardType: Text;
        lastFourDigits: Text;
        tokenId: Text; // Square payment token
    };

    // public type UserProfile = {
    //     id: Principal;
    //     name: Text;
    //     email: Text;
    //     phone: Text;
    //     address: Text;
    //     membershipTier: MembershipTier;
    //     paymentMethods: [PaymentMethod];
    //     registrationDate: Time.Time;
    //     lastUpdated: Time.Time;
    // };
    public type UserProfile = {
    id: Principal;
    name: Text;
    email: Text;
    phone: Text;
    address: Text;
    membershipTier: MembershipTier;
    paymentMethods: [PaymentMethod];
    registrationDate: Time.Time;
    lastUpdated: Time.Time;
  };

    public type ServiceProvider = {
        id: Text;
        name: Text;
        trade: Text;
        phone: Text;
        availability: Bool;
        rating: Float;
        responseTime: Int; // Average response time in minutes
    };

    public type Location = {
        latitude: Float;
        longitude: Float;
        address: Text;
    };

    public type EmergencyCall = {
        id: Text;
        userId: UserId;
        serviceType: Text;
        description: Text;
        location: Location;
        timestamp: Time.Time;
        status: {
            #Initiated;
            #Processing;
            #Assigned;
            #Completed;
            #Cancelled;
        };
        assignedProvider: ?Text;
        paymentId: ?Text;
    };

    public type MapData = {
        id: Text;
        name: Text;
        location: Location;
        data: Blob; // Map data stored as binary
        created: Time.Time;
        lastUpdated: Time.Time;
    };

    public type Report = {
        id: Text;
        callId: Text;
        providerId: Text;
        description: Text;
        photos: [Blob];
        timestamp: Time.Time;
    };

    // State
    private stable var userProfileEntries : [(UserId, UserProfile)] = [];
    private stable var serviceProviderEntries : [(Text, ServiceProvider)] = [];
    private stable var emergencyCallEntries : [(Text, EmergencyCall)] = [];
    private stable var mapDataEntries : [(Text, MapData)] = [];
    private stable var reportEntries : [(Text, Report)] = [];
    
    // private var userProfiles = HashMap.HashMap<UserId, UserProfile>(0, Principal.equal, Principal.hash);
    // let userProfiles = HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);
    let userProfiles = HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);
    private var serviceProviders = HashMap.HashMap<Text, ServiceProvider>(0, Text.equal, Text.hash);
    private var emergencyCalls = HashMap.HashMap<Text, EmergencyCall>(0, Text.equal, Text.hash);
    private var mapData = HashMap.HashMap<Text, MapData>(0, Text.equal, Text.hash);
    private var reports = HashMap.HashMap<Text, Report>(0, Text.equal, Text.hash);

    // System initialization
    system func preupgrade() {
        userProfileEntries := Iter.toArray(userProfiles.entries());
        serviceProviderEntries := Iter.toArray(serviceProviders.entries());
        emergencyCallEntries := Iter.toArray(emergencyCalls.entries());
        mapDataEntries := Iter.toArray(mapData.entries());
        reportEntries := Iter.toArray(reports.entries());
    };

    system func postupgrade() {
        // userProfiles := HashMap.fromIter<Principal, UserProfile>(
        //     Iter.fromArray(userProfileEntries), 
        //     userProfileEntries.size(), 
        //     Principal.equal, 
        //     Principal.hash
        // );
        serviceProviders := HashMap.fromIter<Text, ServiceProvider>(
            Iter.fromArray(serviceProviderEntries), 
            serviceProviderEntries.size(), 
            Text.equal, 
            Text.hash
        );
        emergencyCalls := HashMap.fromIter<Text, EmergencyCall>(
            Iter.fromArray(emergencyCallEntries), 
            emergencyCallEntries.size(), 
            Text.equal, 
            Text.hash
        );
        mapData := HashMap.fromIter<Text, MapData>(
            Iter.fromArray(mapDataEntries), 
            mapDataEntries.size(), 
            Text.equal, 
            Text.hash
        );
        reports := HashMap.fromIter<Text, Report>(
            Iter.fromArray(reportEntries), 
            reportEntries.size(), 
            Text.equal, 
            Text.hash
        );
        
        userProfileEntries := [];
        serviceProviderEntries := [];
        emergencyCallEntries := [];
        mapDataEntries := [];
        reportEntries := [];
    };

    // User Management Functions
    // public shared(msg) func createUser(
    //     userProfile: {
    //         name: Text;
    //         email: Text;
    //         phone: Text;
    //         address: Text;
    //         membershipTier: MembershipTier;
    //     }
    // ) : async Principal {
    //     let caller = msg.caller;
    //     let userId = caller;  // In IC, the principal is the user ID
        
    //     // Check if user already exists
    //     switch (userProfiles.get(userId)) {
    //         case (?_) {
    //             // User already exists, just return the ID
    //             return userId;
    //         };
    //         case (null) {
    //             // Create new user profile
    //             let now = Time.now();
                
    //             let newProfile : UserProfile = {
    //                 id = userId;
    //                 name = userProfile.name;
    //                 email = userProfile.email;
    //                 phone = userProfile.phone;
    //                 address = userProfile.address;
    //                 membershipTier = userProfile.membershipTier;
    //                 paymentMethods = [];
    //                 registrationDate = now;
    //                 lastUpdated = now;
    //             };
                
    //             userProfiles.put(userId, newProfile);
                
    //             // Also initialize payment method if provided
    //             // This could be extended to handle the payment method in the userProfile parameter
    //             return userId;
    //         };
    //     };
    // };

    // Updated createUser to take userId as a parameter
    // public shared func createUser(
    //     userId: Principal,
    //     userProfile: {
    //         name: Text;
    //         email: Text;
    //         phone: Text;
    //         address: Text;
    //         membershipTier: MembershipTier;
    //     }
    // ) : async Principal {
    //     Debug.print("Creating user: " # Principal.toText(userId));
    //     switch (userProfiles.get(userId)) {
    //         case (?_) {
    //             Debug.print("User already exists: " # Principal.toText(userId));
    //             return userId;
    //         };
    //         case (null) {
    //             let now = Time.now();
    //             let newProfile: UserProfile = {
    //                 id = userId;
    //                 name = userProfile.name;
    //                 email = userProfile.email;
    //                 phone = userProfile.phone;
    //                 address = userProfile.address;
    //                 membershipTier = userProfile.membershipTier;
    //                 paymentMethods = [];
    //                 registrationDate = now;
    //                 lastUpdated = now;
    //             };
    //             userProfiles.put(userId, newProfile);
    //             Debug.print("User created: " # Principal.toText(userId));
    //             return userId;
    //         };
    //     };
    // };

//     public shared func createUser(userId: Principal, userProfile: { name: Text; email: Text; phone: Text; address: Text; membershipTier: MembershipTier }) : async Principal {
//     Debug.print("Creating user: " # Principal.toText(userId));
//     switch (userProfiles.get(userId)) {
//         case (?_) { Debug.print("User already exists"); return userId; };
//         case (null) {
//             let now = Time.now();
//             let newProfile: UserProfile = {
//                 id = userId;
//                 name = userProfile.name;
//                 email = userProfile.email;
//                 phone = userProfile.phone;
//                 address = userProfile.address;
//                 membershipTier = userProfile.membershipTier;
//                 paymentMethods = [];
//                 registrationDate = now;
//                 lastUpdated = now;
//             };
//             userProfiles.put(userId, newProfile);
//             Debug.print("User created: " # Principal.toText(userId));
//             return userId;
//         };
//     };
// };



public shared func createUser(
    userId: Principal,
    userProfile: {
      name: Text;
      email: Text;
      phone: Text;
      address: Text;
      membershipTier: MembershipTier;
    }
  ) : async Principal {
    Debug.print("Creating user: " # Principal.toText(userId));
    switch (userProfiles.get(userId)) {
      case (?_) {
        Debug.print("User already exists: " # Principal.toText(userId));
        return userId;
      };
      case (null) {
        let now = Time.now();
        let newProfile: UserProfile = {
          id = userId;
          name = userProfile.name;
          email = userProfile.email;
          phone = userProfile.phone;
          address = userProfile.address;
          membershipTier = userProfile.membershipTier;
          paymentMethods = [];
          registrationDate = now;
          lastUpdated = now;
        };
        userProfiles.put(userId, newProfile);
        Debug.print("User created: " # Principal.toText(userId));
        return userId;
      };
    };
  };



    // public query func getUserProfile(userId: Principal) : async ?UserProfile {
    //     return userProfiles.get(userId);
    // };
//     public query func getUserProfile(userId: Principal) : async ?UserProfile {
//     // Safe null handling
//     let profile = userProfiles.get(userId);
    
//     // Convert to optional explicitly
//     switch (profile) {
//         case (?p) ?p;
//         case null null;
//     }
// };

    // public shared(msg) func updateUserProfile(
    //     userId: Principal,
    //     profile: {
    //         name: ?Text;
    //         email: ?Text;
    //         phone: ?Text;
    //         address: ?Text;
    //         membershipTier: ?MembershipTier;
    //     }
    // ) : async Bool {
    //     let caller = msg.caller;
        
    //     // Verify caller is authorized (either the user or an admin)
    //     if (not Principal.equal(caller, userId) and not isAdmin(caller)) {
    //         return false;
    //     };
        
    //     // Verify user exists
    //     switch (userProfiles.get(userId)) {
    //         case (null) {
    //             return false;
    //         };
    //         case (?existingProfile) {
    //             // Update profile with new values where provided
    //             let updatedProfile : UserProfile = {
    //                 id = existingProfile.id;
    //                 name = Option.get(profile.name, existingProfile.name);
    //                 email = Option.get(profile.email, existingProfile.email);
    //                 phone = Option.get(profile.phone, existingProfile.phone);
    //                 address = Option.get(profile.address, existingProfile.address);
    //                 membershipTier = Option.get(profile.membershipTier, existingProfile.membershipTier);
    //                 paymentMethods = existingProfile.paymentMethods;
    //                 registrationDate = existingProfile.registrationDate;
    //                 lastUpdated = Time.now();
    //             };
                
    //             userProfiles.put(userId, updatedProfile);
    //             return true;
    //         };
    //     };
    // };

    // Updated updateUserProfile to remove authorization check for development
    // public shared func updateUserProfile(
    //     userId: Principal,
    //     profile: {
    //         name: ?Text;
    //         email: ?Text;
    //         phone: ?Text;
    //         address: ?Text;
    //         membershipTier: ?MembershipTier;
    //     }
    // ) : async Bool {
    //     Debug.print("Updating user: " # Principal.toText(userId));
    //     switch (userProfiles.get(userId)) {
    //         case (null) {
    //             Debug.print("User not found: " # Principal.toText(userId));
    //             return false;
    //         };
    //         case (?existingProfile) {
    //             let updatedProfile: UserProfile = {
    //                 id = existingProfile.id;
    //                 name = Option.get(profile.name, existingProfile.name);
    //                 email = Option.get(profile.email, existingProfile.email);
    //                 phone = Option.get(profile.phone, existingProfile.phone); // Fixed typo
    //                 address = Option.get(profile.address, existingProfile.address);
    //                 membershipTier = Option.get(profile.membershipTier, existingProfile.membershipTier);
    //                 paymentMethods = existingProfile.paymentMethods;
    //                 registrationDate = existingProfile.registrationDate;
    //                 lastUpdated = Time.now();
    //             };
    //             userProfiles.put(userId, updatedProfile);
    //             Debug.print("User updated: " # Principal.toText(userId));
    //             return true;
    //         };
    //     };
    // };


    public shared func updateUserProfile(userId: Principal, profile: { name: ?Text; email: ?Text; phone: ?Text; address: ?Text; membershipTier: ?MembershipTier }) : async Bool {
    Debug.print("Updating user: " # Principal.toText(userId));
    switch (userProfiles.get(userId)) {
        case (null) {
            Debug.print("User not found: " # Principal.toText(userId));
            return false;
        };
        case (?existingProfile) {
            let updatedProfile: UserProfile = {
                id = existingProfile.id;
                name = Option.get(profile.name, existingProfile.name);
                email = Option.get(profile.email, existingProfile.email);
                phone = Option.get(profile.phone, existingProfile.phone);
                address = Option.get(profile.address, existingProfile.address);
                membershipTier = Option.get(profile.membershipTier, existingProfile.membershipTier);
                paymentMethods = existingProfile.paymentMethods;
                registrationDate = existingProfile.registrationDate;
                lastUpdated = Time.now();
            };
            userProfiles.put(userId, updatedProfile);
            Debug.print("User updated: " # Principal.toText(userId));
            return true;
        };
    };
};




    // In your Motoko canister
// public shared(msg) func addPaymentMethod(userId: Principal, method: PaymentMethod) : async Bool {
//   switch (userProfiles.get(userId)) {
//     case (null) { return false };
//     case (?user) {
//       let updated = {
//         id = user.id;
//         name = user.name;
//         email = user.email;
//         phone = user.phone;
//         address = user.address;
//         membershipTier = user.membershipTier;
//         paymentMethods = Array.append(user.paymentMethods, [method]);
//         registrationDate = user.registrationDate;
//         lastUpdated = Time.now();
//       };
//       userProfiles.put(userId, updated);
//       return true;
//     }
//   };
// };

// public shared(msg) func addPaymentMethod(userId: Principal, method: PaymentMethod) : async Bool {
//   switch (userProfiles.get(userId)) {
//     case (null) { return false };
//     case (?user) {
//       // Check for existing payment method
//       let existing = Array.find<PaymentMethod>(
//         user.paymentMethods,
//         func(m: PaymentMethod) : Bool {
//           m.lastFourDigits == method.lastFourDigits and
//           m.cardType == method.cardType
//         }
//       );

//       // Update token if exists, else add new
//       let updatedMethods = switch (existing) {
//         case (?_) {
//           // Replace token for existing card
//           Array.map<PaymentMethod, PaymentMethod>(
//             user.paymentMethods,
//             func(m) {
//               if (m.lastFourDigits == method.lastFourDigits and
//                   m.cardType == method.cardType) {
//                 {
//                   cardType = m.cardType; 
//                   lastFourDigits = m.lastFourDigits; 
//                   tokenId = method.tokenId 
//                 };
//               } else {
//                 m;
//               }
//             }
//           )
//         };
//         case (null) {
//           // Add new card
//           Array.append(user.paymentMethods, [method])
//         };
//       };

//       // CORRECTED RECORD UPDATE SYNTAX
//       let updated : UserProfile = {
//         id = user.id;
//         name = user.name;
//         email = user.email;
//         phone = user.phone;
//         address = user.address;
//         membershipTier = user.membershipTier;
//         paymentMethods = updatedMethods;
//         registrationDate = user.registrationDate;
//         lastUpdated = Time.now();
//       };
      
//       userProfiles.put(userId, updated);
//       return true;
//     }
//   };
// };



public shared func addPaymentMethod(userId: Principal, method: PaymentMethod) : async Bool {
        Debug.print("Adding payment method for user: " # Principal.toText(userId));
        switch (userProfiles.get(userId)) {
            case (null) {
                Debug.print("User not found: " # Principal.toText(userId));
                return false;
            };
            case (?user) {
                let updatedMethods = Array.append(user.paymentMethods, [method]);
                let updated: UserProfile = {
                    id = user.id;
                    name = user.name;
                    email = user.email;
                    phone = user.phone;
                    address = user.address;
                    membershipTier = user.membershipTier;
                    paymentMethods = updatedMethods;
                    registrationDate = user.registrationDate;
                    lastUpdated = Time.now();
                };
                userProfiles.put(userId, updated);
                Debug.print("Payment method added for user: " # Principal.toText(userId));
                return true;
            };
        };
    };

    // public query func getUserProfile(userId: Principal) : async ?UserProfile {
    //     Debug.print("Querying user: " # Principal.toText(userId));
    //     return userProfiles.get(userId);
    // };
    public query func getUserProfile(userId: Principal) : async ?UserProfile {
    Debug.print("Querying user: " # Principal.toText(userId));
    userProfiles.get(userId);
};



public shared(msg) func deleteUser(userId: Principal) : async Bool {
    let caller = msg.caller;
    
    // Verify caller is authorized (user themselves or admin)
    if (not Principal.equal(caller, userId) and not isAdmin(caller)) {
        return false;
    };
    
    switch (userProfiles.remove(userId)) {
        case (?_) { true }; // User existed and was removed
        case null { false }; // User didn't exist
    };
};


    // Emergency Call Functions
    public shared(msg) func initiateEmergencyCall(
        userId: Principal,
        serviceType: Text,
        description: Text,
        location: Location
    ) : async Result.Result<EmergencyCall, Text> {
        let caller = msg.caller;
        
        // Verify caller is authorized (either the user or an admin)
        if (not Principal.equal(caller, userId) and not isAdmin(caller)) {
            return #err("Unauthorized to initiate call for this user");
        };
        
        // Verify user exists
        switch (userProfiles.get(userId)) {
            case (null) {
                return #err("User not registered");
            };
            case (?user) {
                // Generate unique call ID
                let callId = generateId();
                let now = Time.now();
                
                let newCall : EmergencyCall = {
                    id = callId;
                    userId = userId;
                    serviceType = serviceType;
                    description = description;
                    location = location;
                    timestamp = now;
                    status = #Initiated;
                    assignedProvider = null;
                    paymentId = null;
                };
                
                emergencyCalls.put(callId, newCall);
                
                // Process payment (in a real system, this would integrate with Square API)
                let paymentResult = await processEmergencyPayment(userId, serviceType);
                
                switch (paymentResult) {
                    case (#ok(paymentId)) {
                        // Update call with payment information
                        let updatedCall = {
                            id = newCall.id;
                            userId = newCall.userId;
                            serviceType = newCall.serviceType;
                            description = newCall.description;
                            location = newCall.location;
                            timestamp = newCall.timestamp;
                            status = #Processing;
                            assignedProvider = newCall.assignedProvider;
                            paymentId = ?paymentId;
                        };
                        
                        emergencyCalls.put(callId, updatedCall);
                        
                        // Initiate service provider routing
                        ignore routeEmergencyCall(callId);
                        
                        return #ok(updatedCall);
                    };
                    case (#err(error)) {
                        // Update call status to cancelled due to payment failure
                        let updatedCall = {
                            id = newCall.id;
                            userId = newCall.userId;
                            serviceType = newCall.serviceType;
                            description = newCall.description;
                            location = newCall.location;
                            timestamp = newCall.timestamp;
                            status = #Cancelled;
                            assignedProvider = newCall.assignedProvider;
                            paymentId = newCall.paymentId;
                        };
                        
                        emergencyCalls.put(callId, updatedCall);
                        
                        return #err("Payment processing failed: " # error);
                    };
                };
            };
        };
    };

    // Mock payment processing function (would integrate with Square API) For JUST Testing Purpose
    private func processEmergencyPayment(userId: UserId, serviceType: Text) : async Result.Result<Text, Text> {
        // In a real implementation, this would call the Square API
        // For now, we'll just generate a mock payment ID
        return #ok("pmt_" # generateId());
    };

    // Mock service provider routing function
    // private func routeEmergencyCall(callId: Text) : async () {
    //     // In a real implementation, this would:
    //     // 1. Find available service providers based on service type and location
    //     // 2. Dial them sequentially or simultaneously
    //     // 3. Update the call status as providers accept or decline
        
    //     // For the MVP , Testing Purpose, we'll simulate this with a delay and auto-assignment
    //     let call = Option.get(emergencyCalls.get(callId), return);
        
    //     // Find providers for this service type (in a real system this would be more sophisticated)
    //     let availableProviders = Array.filter<ServiceProvider>(
    //         Iter.toArray(serviceProviders.vals()),
    //         func(provider: ServiceProvider) : Bool {
    //             return provider.trade == call.serviceType and provider.availability;
    //         }
    //     );
        
    //     if (availableProviders.size() > 0) {
    //         // Assign to first available provider
    //         let provider = availableProviders[0];
            
    //         let updatedCall = {
    //             id = call.id;
    //             userId = call.userId;
    //             serviceType = call.serviceType;
    //             description = call.description;
    //             location = call.location;
    //             timestamp = call.timestamp;
    //             status = #Assigned;
    //             assignedProvider = ?provider.id;
    //             paymentId = call.paymentId;
    //         };
            
    //         emergencyCalls.put(callId, updatedCall);
    //     };
    // };

//     


    // Option 1: Create a custom delay function using async/await
// Option 2: Remove delay and implement immediate retry logic
private func routeEmergencyCall(callId: Text) : async () {
    let call = switch (emergencyCalls.get(callId)) {
        case (?c) c;
        case null return;
    };
    
    // Get available providers
    let providers = getAvailableProviders(call.serviceType);
    
    if (providers.size() > 0) {
        let provider = providers[0];
        let updatedCall = {
            id = call.id;
            userId = call.userId;
            serviceType = call.serviceType;
            description = call.description;
            location = call.location;
            timestamp = call.timestamp;
            status = #Assigned;
            assignedProvider = ?provider.id;
            paymentId = call.paymentId;
        };
        emergencyCalls.put(callId, updatedCall);
        
        // Send notification
        ignore notificationManager.sendNotification(
            #ServiceAssigned,
            "Service Provider Assigned",
            "Provider: " # provider.name # " has been assigned to your case",
            #High,
            #User(call.userId),
            null
        );
    };
    // No delay or retry logic in this version
};


private func getAvailableProviders(serviceType: Text) : [ServiceProvider] {
    Array.filter<ServiceProvider>(
        Iter.toArray(serviceProviders.vals()),
        func(p: ServiceProvider) : Bool {
            p.trade == serviceType and p.availability
        }
    )
};

//     private func routeEmergencyCall(callId: Text) : async () {
//     // Retrieve the call record; if not found, exit.
//     let call = Option.get(emergencyCalls.get(callId), return);
    
//     // Filter available providers matching the service type
//     let availableProviders = Array.filter<ServiceProvider>(
//         Iter.toArray(serviceProviders.vals()),
//         func(provider: ServiceProvider) : Bool {
//             return provider.trade == call.serviceType and provider.availability;
//         }
//     );
    
//     if (availableProviders.size() > 0) {
//         // Assign the first available provider
//         let provider = availableProviders[0];
//         let updatedCall = {
//             id = call.id;
//             userId = call.userId;
//             serviceType = call.serviceType;
//             description = call.description;
//             location = call.location;
//             timestamp = call.timestamp;
//             status = #Assigned;
//             assignedProvider = ?provider.id;
//             paymentId = call.paymentId;
//         };
//         emergencyCalls.put(callId, updatedCall);
//     } else {
//         // OPTIONAL: For testing, force assignment if no provider is available.
//         // Uncomment the following block to simulate assignment.
        
//         let defaultProvider = "provider-plumbing-1";
//         let updatedCall = {
//             id = call.id;
//             userId = call.userId;
//             serviceType = call.serviceType;
//             description = call.description;
//             location = call.location;
//             timestamp = call.timestamp;
//             status = #Assigned;
//             assignedProvider = ?defaultProvider;
//             paymentId = call.paymentId;
//         };
//         emergencyCalls.put(callId, updatedCall);
        
//         // Otherwise, leave the call unassigned.
//     };
// };


// Add to your EmergencyServicePlatform actor in main.mo

// Map Management Functions
public shared(msg) func createMap(
    name: Text,
    description: ?Text,
    centerCoordinates: MappingService.Coordinates,
    defaultZoom: Float,
    initialLayers: [MappingService.MapLayer]
) : async Result.Result<Text, Text> {
    await mappingEngine.createMap(name, description, centerCoordinates, defaultZoom, initialLayers);
};

public shared(msg) func addMapLayer(
    mapId: Text,
    name: Text,
    description: ?Text,
    points: [MappingService.MapPoint]
) : async Result.Result<Text, Text> {
    await mappingEngine.addMapLayer(mapId, name, description, points);
};

public shared(msg) func calculateRoute(
    origin: MappingService.Location,
    destination: MappingService.Location
) : async Result.Result<MappingService.Route, Text> {
    await mappingEngine.calculateRoute(origin, destination);
};


    // Map and Location Services
    public shared(msg) func uploadMapData(
        name: Text,
        location: Location,
        data: Blob
    ) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        // Verify user is registered (and potentially check for admin rights)
        switch (userProfiles.get(caller)) {
            case (null) {
                return #err("Unauthorized");
            };
            case (?_) {
                let mapId = generateId();
                let now = Time.now();
                
                let newMap : MapData = {
                    id = mapId;
                    name = name;
                    location = location;
                    data = data;
                    created = now;
                    lastUpdated = now;
                };
                
                mapData.put(mapId, newMap);
                return #ok(mapId);
            };
        };
    };

    public query func getMapData(mapId: Text) : async Result.Result<MapData, Text> {
        switch (mapData.get(mapId)) {
            case (?map) {
                return #ok(map);
            };
            case (null) {
                return #err("Map not found");
            };
        };
    };

    // Report Management
    // public shared(msg) func submitReport(
    //     callId: Text,
    //     description: Text,
    //     photos: [Blob]
    // ) : async Result.Result<Text, Text> {
    //     let caller = msg.caller;
        
    //     // In a real implementation, verify caller is the assigned service provider
    //     switch (emergencyCalls.get(callId)) {
    //         case (null) {
    //             return #err("Emergency call not found");
    //         };
    //         case (?call) {
    //             let reportId = generateId();
    //             let providerId = switch (call.assignedProvider) {
    //                 case (?id) id;
    //                 case (null) return #err("No provider assigned to this call");
    //             };
                
    //             let newReport : Report = {
    //                 id = reportId;
    //                 callId = callId;
    //                 providerId = providerId;
    //                 description = description;
    //                 photos = photos;
    //                 timestamp = Time.now();
    //             };
                
    //             reports.put(reportId, newReport);
    //             return #ok(reportId);
    //         };
    //     };
    // };

    // new report code 

    public shared(msg) func submitReport(
    callId: Text,
    description: Text,
    photos: [Blob]
) : async Result.Result<Text, Text> {
    let caller = msg.caller;
    
    // First check if call exists
    let initialCall = switch (emergencyCalls.get(callId)) {
        case (?c) c;
        case (null) return #err("Emergency call not found");
    };
    
    // Auto-assign provider if needed
    if (initialCall.assignedProvider == null) {
        ignore await routeEmergencyCall(callId);
    };
    
    // Get updated call after potential assignment
    let updatedCall = switch (emergencyCalls.get(callId)) {
        case (?c) c;
        case (null) return #err("Call disappeared after assignment attempt");
    };
    
    switch (updatedCall.assignedProvider) {
        case (null) {
            #err("No available providers could be assigned")
        };
        case (?providerId) {
            let reportId = generateId();
            let newReport : Report = {
                id = reportId;
                callId = callId;
                providerId = providerId;
                description = description;
                photos = photos;
                timestamp = Time.now();
            };
            
            reports.put(reportId, newReport);
            #ok(reportId)
        };
    };
};



    // Administrative Functions
    public shared(msg) func registerServiceProvider(
        name: Text,
        trade: Text,
        phone: Text
    ) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        // In a real implementation, verify caller has admin rights
        // For the MVP, we'll allow any registered user to add providers
        switch (userProfiles.get(caller)) {
            case (null) {
                return #err("Unauthorized");
            };
            case (?_) {
                let providerId = generateId();
                
                let newProvider : ServiceProvider = {
                    id = providerId;
                    name = name;
                    trade = trade;
                    phone = phone;
                    availability = true;
                    rating = 0.0;
                    responseTime = 0;
                };
                
                serviceProviders.put(providerId, newProvider);
                return #ok(providerId);
            };
        };
    };

    public query func getServiceProviders(trade: ?Text) : async [ServiceProvider] {
        let providers = Iter.toArray(serviceProviders.vals());
        
        switch(trade) {
            case (null) {
                // Return all providers if no trade is specified
                return providers;
            };
            case (?t) {
                // Filter providers by trade
                return Array.filter<ServiceProvider>(
                    providers,
                    func(provider: ServiceProvider) : Bool {
                        return provider.trade == t;
                    }
                );
            };
        };
    };

    public shared(msg) func getEmergencyCalls() : async Result.Result<[EmergencyCall], Text> {
        let caller = msg.caller;
        
        // In a real implementation, verify caller has admin rights
        switch (userProfiles.get(caller)) {
            case (null) {
                return #err("Unauthorized");
            };
            case (?_) {
                return #ok(Iter.toArray(emergencyCalls.vals()));
            };
        };
    };

    // Utility Functions
    private func generateId() : Text {
        let timestamp = Int.toText(Time.now());
        // let randomPart = Int.toText(Random.next());
        let randomPart = Int.toText(Nat32.toNat(Text.hash(timestamp)) % 1_000_000);
        return timestamp # "-" # randomPart;
    };

    // Initial setup for the system
    public shared(msg) func initializeSystem() : async Result.Result<(), Text> {
        let caller = msg.caller;
        
        // In a real implementation, verify caller is the system administrator
        // For the MVP, we'll allow the first caller to initialize the system
        if (Iter.size(userProfiles.entries()) == 0) {
            // Add some default service providers
            let plumberID = "provider-plumbing-1";
            let plumber : ServiceProvider = {
                id = plumberID;
                name = "Emergency Plumbing Services";
                trade = "Plumbing";
                phone = "555-0123";
                availability = true;
                rating = 4.8;
                responseTime = 15;
            };
            
            let electricianID = "provider-electrical-1";
            let electrician : ServiceProvider = {
                id = electricianID;
                name = "Quick Electrical Solutions";
                trade = "Electrical";
                phone = "555-0124";
                availability = true;
                rating = 4.7;
                responseTime = 20;
            };
            
            let carpenterID = "provider-carpentry-1";
            let carpenter : ServiceProvider = {
                id = carpenterID;
                name = "Reliable Carpentry";
                trade = "Carpentry";
                phone = "555-0125";
                availability = true;
                rating = 4.9;
                responseTime = 25;
            };
            
            serviceProviders.put(plumberID, plumber);
            serviceProviders.put(electricianID, electrician);
            serviceProviders.put(carpenterID, carpenter);
            
            return #ok();
        } else {
            return #err("System already initialized");
        };
    };

    // API for mobile app to get navigation data
    public query func getNavigationData(locationFrom: Location, locationTo: Location) : async Result.Result<Text, Text> {
        // In a real implementation, this would integrate with a mapping service
        // For the MVP, we'll return a simple JSON string representing the route
        let routeData = "{\"route\": [{\"lat\": " # Float.toText(locationFrom.latitude) # ", \"lng\": " # Float.toText(locationFrom.longitude) # "}, {\"lat\": " # Float.toText(locationTo.latitude) # ", \"lng\": " # Float.toText(locationTo.longitude) # "}]}";
        
        return #ok(routeData);
    };
    
    // Function to get a report by ID
    public query func getReport(reportId: Text) : async Result.Result<Report, Text> {
        switch (reports.get(reportId)) {
            case (?report) {
                return #ok(report);
            };
            case (null) {
                return #err("Report not found");
            };
        };
    };

    // Function to get all reports for a specific call
    public query func getReportsForCall(callId: Text) : async Result.Result<[Report], Text> {
        let callReports = Array.filter<Report>(
            Iter.toArray(reports.vals()),
            func(report: Report) : Bool {
                return report.callId == callId;
            }
        );
        
        return #ok(callReports);
    };

    // Function to update service provider availability
    public shared(msg) func updateProviderAvailability(providerId: Text, available: Bool) : async Result.Result<(), Text> {
        let caller = msg.caller;
        
        // In a real implementation, verify caller has admin rights or is the provider
        switch (serviceProviders.get(providerId)) {
            case (null) {
                return #err("Service provider not found");
            };
            case (?provider) {
                let updatedProvider : ServiceProvider = {
                    id = provider.id;
                    name = provider.name;
                    trade = provider.trade;
                    phone = provider.phone;
                    availability = available;
                    rating = provider.rating;
                    responseTime = provider.responseTime;
                };
                
                serviceProviders.put(providerId, updatedProvider);
                return #ok();
            };
        };
    };

    // Function to get call history for a user
    public shared(msg) func getUserCallHistory() : async Result.Result<[EmergencyCall], Text> {
        let caller = msg.caller;
        
        switch (userProfiles.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?_) {
                let userCalls = Array.filter<EmergencyCall>(
                    Iter.toArray(emergencyCalls.vals()),
                    func(call: EmergencyCall) : Bool {
                        return call.userId == caller;
                    }
                );
                
                return #ok(userCalls);
            };
        };
    };

    // Function to handle feedback on service providers
    public shared(msg) func submitProviderFeedback(providerId: Text, rating: Float, comment: Text) : async Result.Result<(), Text> {
        let caller = msg.caller;
        
        // Verify user exists
        switch (userProfiles.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?_) {
                // Verify provider exists
                switch (serviceProviders.get(providerId)) {
                    case (null) {
                        return #err("Service provider not found");
                    };
                    case (?provider) {
                        // In a real implementation, we would save this feedback and update the provider's rating
                        // For the MVP, we'll just update the provider's rating directly
                        
                        // Simple averaging of ratings (in a real system, we'd use a more sophisticated algorithm)
                        let newRating = (provider.rating + rating) / 2.0;
                        
                        let updatedProvider : ServiceProvider = {
                            id = provider.id;
                            name = provider.name;
                            trade = provider.trade;
                            phone = provider.phone;
                            availability = provider.availability;
                            rating = newRating;
                            responseTime = provider.responseTime;
                        };
                        
                        serviceProviders.put(providerId, updatedProvider);
                        return #ok();
                    };
                };
            };
        };
    };

    // Add helper function for admin check
    private func isAdmin(principal: Principal) : Bool {
        // In a real system, we'd check against a list of admin principals
        // For now, just return false unless we implement a proper admin system
        return false;
    };

    // Payment Methods Functions
    // public shared(msg) func addPaymentMethod(
    //     userId: Principal,
    //     paymentMethod: PaymentMethod
    // ) : async Bool {
    //     let caller = msg.caller;
        
    //     // Verify caller is authorized (either the user or an admin)
    //     if (not Principal.equal(caller, userId) and not isAdmin(caller)) {
    //         return false;
    //     };
        
    //     // Verify user exists and add payment method
    //     switch (userProfiles.get(userId)) {
    //         case (null) {
    //             return false;
    //         };
    //         case (?user) {
    //             // Add the new payment method to the user's list
    //             let updatedPaymentMethods = Array.append<PaymentMethod>(user.paymentMethods, [paymentMethod]);
                
    //             let updatedUser : UserProfile = {
    //                 id = user.id;
    //                 name = user.name;
    //                 email = user.email;
    //                 phone = user.phone;
    //                 address = user.address;
    //                 membershipTier = user.membershipTier;
    //                 paymentMethods = updatedPaymentMethods;
    //                 registrationDate = user.registrationDate;
    //                 lastUpdated = Time.now();
    //             };
                
    //             userProfiles.put(userId, updatedUser);
    //             return true;
    //         };
    //     };
    // };

    public query func getUserPaymentMethods(userId: Principal) : async [PaymentMethod] {
        switch (userProfiles.get(userId)) {
            case (?user) {
                return user.paymentMethods;
            };
            case (null) {
                return [];
            };
        };
    };

    public query func getEmergencyCallDetails(callId: Text) : async Result.Result<EmergencyCall, Text> {
        switch (emergencyCalls.get(callId)) {
            case (?call) {
                return #ok(call);
            };
            case (null) {
                return #err("Emergency call not found");
            };
        };
    };

    public query func getUserEmergencyCalls(userId: Principal) : async [EmergencyCall] {
        // Filter calls by user ID
        return Array.filter<EmergencyCall>(
            Iter.toArray(emergencyCalls.vals()),
            func(call: EmergencyCall) : Bool {
                return Principal.equal(call.userId, userId);
            }
        );
    };

    public query func getAllEmergencyCalls() : async [EmergencyCall] {
        return Iter.toArray(emergencyCalls.vals());
    };

    // System Stats
    public query func getSystemStats() : async {
        totalUsers: Nat;
        totalServiceProviders: Nat;
        totalEmergencyCalls: Nat;
        activeEmergencyCalls: Nat;
        totalPayments: Nat;
    } {
        let activeCallCount = Array.foldLeft<EmergencyCall, Nat>(
            Iter.toArray(emergencyCalls.vals()),
            0,
            func(acc: Nat, call: EmergencyCall) : Nat {
                switch (call.status) {
                    case (#Initiated) acc + 1;
                    case (#Processing) acc + 1; 
                    case (#Assigned) acc + 1;
                    case (#Completed) acc;
                    case (#Cancelled) acc;
                };
            }
        );
        
        return {
            totalUsers = Iter.size(userProfiles.entries());
            totalServiceProviders = Iter.size(serviceProviders.entries());
            totalEmergencyCalls = Iter.size(emergencyCalls.entries());
            activeEmergencyCalls = activeCallCount;
            totalPayments = 0; // In a real implementation, this would be the count of processed payments
        };
    };
};