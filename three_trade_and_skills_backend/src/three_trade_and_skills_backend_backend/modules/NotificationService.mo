import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";

module NotificationService {
    public type NotificationType = {
        #EmergencyAlert;
        #ServiceAssigned;
        #ServiceUpdated;
        #PaymentProcessed;
        #ServiceCompleted;
        #GeneralMessage;
    };
    
    public type NotificationPriority = {
        #High;
        #Medium;
        #Low;
    };
    
    public type NotificationStatus = {
        #Pending;
        #Sent;
        #Delivered;
        #Read;
        #Failed;
    };
    
    public type NotificationTarget = {
        #User: Principal;
        #ServiceProvider: Text;
        #Admin;
        #All;
    };
    
    public type Notification = {
        id: Text;
        type_: NotificationType;
        title: Text;
        message: Text;
        priority: NotificationPriority;
        target: NotificationTarget;
        status: NotificationStatus;
        created: Time.Time;
        updated: Time.Time;
        metadata: ?Text; // JSON string with additional data
    };
    
    public class NotificationManager() {
        private let notifications = HashMap.HashMap<Text, Notification>(0, Text.equal, Text.hash);
        
        // Send a notification
        public func sendNotification(
            type_: NotificationType,
            title: Text,
            message: Text,
            priority: NotificationPriority,
            target: NotificationTarget,
            metadata: ?Text
        ) : async Result.Result<Text, Text> {
            let notificationId = generateId();
            let now = Time.now();
            
            let newNotification : Notification = {
                id = notificationId;
                type_ = type_;
                title = title;
                message = message;
                priority = priority;
                target = target;
                status = #Pending;
                created = now;
                updated = now;
                metadata = metadata;
            };
            
            notifications.put(notificationId, newNotification);
            
            // In a real implementation, this would integrate with push notification services
            // For the MVP, we'll simulate sending the notification (FOr JUST Testing Purpose)
            await processNotification(notificationId);
            
            return #ok(notificationId);
        };
        
        // Process a notification (simulate sending)
        private func processNotification(notificationId: Text) : async () {
            switch (notifications.get(notificationId)) {
                case (null) {
                    return;
                };
                case (?notification) {
                    // In a real implementation, this would send the notification via a service
                    // For the MVP, we'll just update the status
                    
                    // Simulate a 5% chance of failure
                    let now = Time.now();
                    if (now % 20 == 0) {
                        let failedNotification : Notification = {
                            id = notification.id;
                            type_ = notification.type_;
                            title = notification.title;
                            message = notification.message;
                            priority = notification.priority;
                            target = notification.target;
                            status = #Failed;
                            created = notification.created;
                            updated = now;
                            metadata = notification.metadata;
                        };
                        
                        notifications.put(notificationId, failedNotification);
                        return;
                    };
                    
                    let sentNotification : Notification = {
                        id = notification.id;
                        type_ = notification.type_;
                        title = notification.title;
                        message = notification.message;
                        priority = notification.priority;
                        target = notification.target;
                        status = #Sent;
                        created = notification.created;
                        updated = now;
                        metadata = notification.metadata;
                    };
                    
                    notifications.put(notificationId, sentNotification);
                    
                    // In a real system, we would wait for delivery confirmation
                    // For the MVP, we'll simulate delivery after a delay
                    
                    let deliveredNotification : Notification = {
                        id = notification.id;
                        type_ = notification.type_;
                        title = notification.title;
                        message = notification.message;
                        priority = notification.priority;
                        target = notification.target;
                        status = #Delivered;
                        created = notification.created;
                        updated = now;
                        metadata = notification.metadata;
                    };
                    
                    notifications.put(notificationId, deliveredNotification);
                };
            };
        };
        
        // Mark a notification as read
        public func markNotificationAsRead(notificationId: Text) : async Result.Result<(), Text> {
            switch (notifications.get(notificationId)) {
                case (null) {
                    return #err("Notification not found");
                };
                case (?notification) {
                    let now = Time.now();
                    
                    let readNotification : Notification = {
                        id = notification.id;
                        type_ = notification.type_;
                        title = notification.title;
                        message = notification.message;
                        priority = notification.priority;
                        target = notification.target;
                        status = #Read;
                        created = notification.created;
                        updated = now;
                        metadata = notification.metadata;
                    };
                    
                    notifications.put(notificationId, readNotification);
                    return #ok();
                };
            };
        };
        
        // Get notifications for a user
        public func getUserNotifications(userId: Principal) : async [Notification] {
            let userNotifications = Array.filter<Notification>(
                Iter.toArray(notifications.vals()),
                func(notification: Notification) : Bool {
                    switch (notification.target) {
                        case (#User(id)) { return id == userId; };
                        case (#All) { return true; };
                        case (_) { return false; };
                    };
                }
            );
            
            return userNotifications;
        };
        
        // Get notifications for a service provider
        public func getProviderNotifications(providerId: Text) : async [Notification] {
            let providerNotifications = Array.filter<Notification>(
                Iter.toArray(notifications.vals()),
                func(notification: Notification) : Bool {
                    switch (notification.target) {
                        case (#ServiceProvider(id)) { return id == providerId; };
                        case (#All) { return true; };
                        case (_) { return false; };
                    };
                }
            );
            
            return providerNotifications;
        };
        
        // Generate a unique ID
        private func generateId() : Text {
            let timestamp = Int.toText(Time.now());
            // let randomPart = Int.toText(Int.abs(Int.fromText(timestamp) % 1000000));
            //  let randomPart = Int.toText(Int.abs(Text.hash(timestamp) % 1_000_000);
            let randomPart = Int.toText(Nat32.toNat(Text.hash(timestamp)) % 1_000_000);
            return "notif_" # timestamp # "_" # randomPart;
        };
    };
}