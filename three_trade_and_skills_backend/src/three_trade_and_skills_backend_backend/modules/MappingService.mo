import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";

module MappingService {
    public type Coordinates = {
        latitude: Float;
        longitude: Float;
    };
    
    public type Location = {
        coordinates: Coordinates;
        address: Text;
        name: ?Text;
    };
    
    public type MapPoint = {
        coordinates: Coordinates;
        Label: Text;
        description: ?Text;
        icon: ?Text; // Reference to icon type
    };
    
    public type Route = {
        id: Text;
        origin: Location;
        destination: Location;
        waypoints: [MapPoint];
        distance: Float; // in meters
        duration: Float; // in seconds
        created: Time.Time;
    };
    
    public type MapLayer = {
        id: Text;
        name: Text;
        description: ?Text;
        visible: Bool;
        points: [MapPoint];
        created: Time.Time;
        lastUpdated: Time.Time;
    };
    
    public type Map = {
        id: Text;
        name: Text;
        description: ?Text;
        centerCoordinates: Coordinates;
        defaultZoom: Float;
        layers: [MapLayer];
        created: Time.Time;
        lastUpdated: Time.Time;
        data: ?Blob; // For custom map data
    };
    
    public class MappingEngine() {
        private let maps = HashMap.HashMap<Text, Map>(0, Text.equal, Text.hash);
        private let routes = HashMap.HashMap<Text, Route>(0, Text.equal, Text.hash);
        
        // Create a new map
        public func createMap(
            name: Text,
            description: ?Text,
            centerCoordinates: Coordinates,
            defaultZoom: Float,
            initialLayers: [MapLayer]
        ) : async Result.Result<Text, Text> {
            let mapId = generateId();
            let now = Time.now();

            let newMap : Map = {
                id = mapId;
                name = name;
                description = description;
                centerCoordinates = centerCoordinates;
                defaultZoom = defaultZoom;
                layers = initialLayers;
                created = now;
                lastUpdated = now;
                data = null;
            };
            
            maps.put(mapId, newMap);
            return #ok(mapId);
        };
        
        // Add a custom layer to a map
        public func addMapLayer(
            mapId: Text,
            name: Text,
            description: ?Text,
            points: [MapPoint]
        ) : async Result.Result<Text, Text> {
            switch (maps.get(mapId)) {
                case (null) {
                    return #err("Map not found");
                };
                case (?map) {
                    let layerId = generateId();
                    let now = Time.now();
                    
                    let newLayer : MapLayer = {
                        id = layerId;
                        name = name;
                        description = description;
                        visible = true;
                        points = points;
                        created = now;
                        lastUpdated = now;
                    };
                    
                    let updatedLayers = Array.append<MapLayer>(map.layers, [newLayer]);
                    
                    let updatedMap : Map = {
                        id = map.id;
                        name = map.name;
                        description = map.description;
                        centerCoordinates = map.centerCoordinates;
                        defaultZoom = map.defaultZoom;
                        layers = updatedLayers;
                        created = map.created;
                        lastUpdated = now;
                        data = map.data;
                    };
                    
                    maps.put(mapId, updatedMap);
                    return #ok(layerId);
                };
            };
        };
        
        // Calculate a route between two locations
        public func calculateRoute(
            origin: Location,
            destination: Location
        ) : async Result.Result<Route, Text> {
            // In a real implementation, this would integrate with a mapping API
            // For the MVP, we'll simulate a direct route between the two points
            
            let routeId = generateId();
            let now = Time.now();
            
            // Calculate approximate distance (this is a simplified calculation)
            let distance = calculateDistance(origin.coordinates, destination.coordinates);
            
            // Estimate duration (assuming average speed of 50 km/h)
            let duration = (distance / 50000.0) * 3600.0; // Convert to seconds
            
            let newRoute : Route = {
                id = routeId;
                origin = origin;
                destination = destination;
                waypoints = [];
                distance = distance;
                duration = duration;
                created = now;
            };
            
            routes.put(routeId, newRoute);
            return #ok(newRoute);
        };
        
        // Get a map by ID
        public func getMap(mapId: Text) : async Result.Result<Map, Text> {
            switch (maps.get(mapId)) {
                case (null) {
                    return #err("Map not found");
                };
                case (?map) {
                    return #ok(map);
                };
            };
        };
        
        // Get a route by ID
        public func getRoute(routeId: Text) : async Result.Result<Route, Text> {
            switch (routes.get(routeId)) {
                case (null) {
                    return #err("Route not found");
                };
                case (?route) {
                    return #ok(route);
                };
            };
        };
        
        // Upload custom map data (e.g., floor plans)
        public func uploadMapData(
            mapId: Text,
            data: Blob
        ) : async Result.Result<(), Text> {
            switch (maps.get(mapId)) {
                case (null) {
                    return #err("Map not found");
                };
                case (?map) {
                    let now = Time.now();
                    
                    let updatedMap : Map = {
                        id = map.id;
                        name = map.name;
                        description = map.description;
                        centerCoordinates = map.centerCoordinates;
                        defaultZoom = map.defaultZoom;
                        layers = map.layers;
                        created = map.created;
                        lastUpdated = now;
                        data = ?data;
                    };
                    
                    maps.put(mapId, updatedMap);
                    return #ok();
                };
            };
        };
        
        // Helper function to calculate distance between two coordinates (Haversine formula)
        private func calculateDistance(origin: Coordinates, destination: Coordinates) : Float {
            let earthRadius = 6371000.0; // Earth radius in meters
            
            let lat1Rad = degreesToRadians(origin.latitude);
            let lat2Rad = degreesToRadians(destination.latitude);
            
            let deltaLatRad = degreesToRadians(destination.latitude - origin.latitude);
            let deltaLonRad = degreesToRadians(destination.longitude - origin.longitude);
            
            let a = Float.sin(deltaLatRad / 2.0) * Float.sin(deltaLatRad / 2.0) +
                   Float.cos(lat1Rad) * Float.cos(lat2Rad) *
                   Float.sin(deltaLonRad / 2.0) * Float.sin(deltaLonRad / 2.0);
            
            let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
            
            return earthRadius * c;
        };
        
        // Helper function to convert degrees to radians
        private func degreesToRadians(degrees: Float) : Float {
            return degrees * Float.pi / 180.0;
        };
        
        // Generate a unique ID
        // private func generateId() : Text {
        //     let timestamp = Int.toText(Time.now());
        //     let randomPart = Int.toText(Int.abs(Int.fromText(timestamp) % 1000000));
        //     return timestamp # "_" # randomPart;
        // };
        // private func generateId() : Text {
        //     let t = Time.now();
        //     let randomPart = Nat.toText(t % 1000000);
        //     return Nat.toText(t) # "_" # randomPart;
        // };
        private func generateId() : Text {
            let timestamp = Int.toText(Time.now());
            // Fixed random part generation using text hash
            // let randomPart = Int.toText(Int.abs(Text.hash(timestamp) % 1_000_000);
            let randomPart = Int.toText(Nat32.toNat(Text.hash(timestamp)) % 1_000_000);
            timestamp # "_" # randomPart;
            };

    };
}