import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";

module SquarePayment {
    // Payment Types
    public type PaymentToken = Text;
    public type PaymentAmount = Nat;
    public type PaymentCurrency = Text;
    public type PaymentId = Text;
    public type ErrorMessage = Text;
    
    public type CardDetails = {
        cardType: Text;
        lastFourDigits: Text;
        tokenId: PaymentToken;
    };
    
    public type PaymentStatus = {
        #Pending;
        #Completed;
        #Failed;
        #Refunded;
    };
    
    public type Payment = {
        id: PaymentId;
        userId: Principal;
        amount: PaymentAmount;
        currency: PaymentCurrency;
        status: PaymentStatus;
        cardDetails: CardDetails;
        timestamp: Time.Time;
        description: Text;
    };
    
    // Mock Square API Connector
    // In a production system, this would use the HTTP outcalls feature to communicate with Square's API
    public class SquareConnector(apiKey: Text, locationId: Text) {
        private let paymentRecords = HashMap.HashMap<PaymentId, Payment>(0, Text.equal, Text.hash);
        
        // Initialize the connector with configuration
        public func init() : async () {
            Debug.print("Square Connector initialized with API Key: " # apiKey # " and Location ID: " # locationId);
        };
        
        // Process a payment
        public func processPayment(
            userId: Principal,
            amount: PaymentAmount,
            currency: PaymentCurrency,
            cardDetails: CardDetails,
            description: Text
        ) : async Result.Result<PaymentId, ErrorMessage> {
            try {
                // In a real implementation, this would call Square's API
                // For the MVP, we'll simulate a successful payment
                
                let paymentId = generatePaymentId();
                let now = Time.now();
                
                let payment : Payment = {
                    id = paymentId;
                    userId = userId;
                    amount = amount;
                    currency = currency;
                    status = #Completed;
                    cardDetails = cardDetails;
                    timestamp = now;
                    description = description;
                };
                
                paymentRecords.put(paymentId, payment);
                
                // Simulate a 5% chance of payment failure
                if (now % 20 == 0) {
                    // Update payment status to failed
                    let failedPayment : Payment = {
                        id = payment.id;
                        userId = payment.userId;
                        amount = payment.amount;
                        currency = payment.currency;
                        status = #Failed;
                        cardDetails = payment.cardDetails;
                        timestamp = payment.timestamp;
                        description = payment.description;
                    };
                    
                    paymentRecords.put(paymentId, failedPayment);
                    return #err("Payment processing failed");
                };
                
                return #ok(paymentId);
            } catch (e) {
                return #err("Error processing payment: " # Debug.trap(Error.message(e)));
            };
        };
        
        // Refund a payment
        public func refundPayment(paymentId: PaymentId) : async Result.Result<(), ErrorMessage> {
            switch (paymentRecords.get(paymentId)) {
                case (null) {
                    return #err("Payment not found");
                };
                case (?payment) {
                    // In a real implementation, this would call Square's API
                    // For the MVP, we'll simulate a successful refund (For Just Test Purpose...)
                    
                    let refundedPayment : Payment = {
                        id = payment.id;
                        userId = payment.userId;
                        amount = payment.amount;
                        currency = payment.currency;
                        status = #Refunded;
                        cardDetails = payment.cardDetails;
                        timestamp = payment.timestamp;
                        description = payment.description;
                    };
                    
                    paymentRecords.put(paymentId, refundedPayment);
                    return #ok();
                };
            };
        };
        
        // Get payment details
        public func getPaymentDetails(paymentId: PaymentId) : async Result.Result<Payment, ErrorMessage> {
            switch (paymentRecords.get(paymentId)) {
                case (null) {
                    return #err("Payment not found");
                };
                case (?payment) {
                    return #ok(payment);
                };
            };
        };
        
        // Get payment history for a user
        public func getUserPaymentHistory(userId: Principal) : async [Payment] {
            let userPayments = Array.filter<Payment>(
                Iter.toArray(paymentRecords.vals()),
                func(payment: Payment) : Bool {
                    return payment.userId == userId;
                }
            );
            
            return userPayments;
        };
        
        // Generate a unique payment ID
        // private func generatePaymentId() : PaymentId {
        //     let timestamp = Int.toText(Time.now());
        //     // let randomPart = Int.toText(Int.abs(Int.fromText(timestamp) % 1000000));
        //      let randomPart = Int.toText(Int.abs(Text.hash(timestamp) % 1_000_000));
        //     return "pmt_" # timestamp # "_" # randomPart;
        // };

//         private func generatePaymentId() : PaymentId {
//     let timestamp = Int.toText(Time.now());
    
//     // Get hash and convert to Nat first
//     let hashNat = Nat32.toNat(Text.hash(timestamp));
    
//     // Generate 6-digit number
//     let randomNumber = hashNat % 1_000_000;
    
//     // Convert to text
//     let randomPart = Nat.toText(randomNumber);
    
//     "pmt_" # timestamp # "_" # randomPart;
// };


        private func generatePaymentId() : PaymentId {
            let timestamp = Int.toText(Time.now());
            // Text.hash returns a Hash (Nat32), not an Int
            let randomPart = Int.toText(Nat32.toNat(Text.hash(timestamp)) % 1_000_000);
            return "pmt_" # timestamp # "_" # randomPart;
        };

    };
}