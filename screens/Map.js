

//------------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, PermissionsAndroid, Platform, TextInput, Button, SafeAreaView } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { GOOGLE_MAPS_API_KEY } from '../config'

// const Map = () => {
//     const [location, setLocation] = useState({
//         // latitude: 21.21351364600479,
//         // longitude: 72.88348488063343,
//         latitude: 21.23377709289707,
//         longitude: 72.86362785365189,
//         latitudeDelta: 0.1,
//         longitudeDelta: 0.1,
//     });
//     const [search, setSearch] = useState('');
//     const [searchedLocation, setSearchedLocation] = useState(null);

//     useEffect(() => {
//         const requestLocationPermission = async () => {
//             if (Platform.OS === 'android') {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                     {
//                         title: "Location Permission",
//                         message: "This app needs access to your location.",
//                         buttonNeutral: "Ask Me Later",
//                         buttonNegative: "Cancel",
//                         buttonPositive: "OK",
//                     }
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     getCurrentLocation();
//                 } else {
//                     console.log("Location permission denied");
//                 }
//             } else {
//                 getCurrentLocation();
//             }
//         };

//         const getCurrentLocation = () => {
//             Geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         ...location,
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                     });
//                 },
//                 (error) => {
//                     console.log(error.code, error.message);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//             );
//         };

//         requestLocationPermission();
//     }, []);

//     const searchLocation = async () => {
//         const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(search)}&key=${GOOGLE_MAPS_API_KEY}`;
//         try {
//             const response = await fetch(apiUrl);
//             const data = await response.json();
//             if (data.results.length > 0) {
//                 const location = data.results[0].geometry.location;
//                 setSearchedLocation({
//                     latitude: location.latitude,
//                     longitude: location.longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 });
//             } else {
//                 console.log("Location not found");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         // <SafeAreaView>
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 region={searchedLocation || location}
//             >
//                 <Marker
//                     coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//                     title={"Current Location"}
//                     description={"This is where you are"}
//                 />
//                 {searchedLocation && (
//                     <Marker
//                         coordinate={{ latitude: searchedLocation.latitude, longitude: searchedLocation.longitude }}
//                         title={"Searched Location"}
//                         description={search}
//                     />
//                 )}
//             </MapView>
//             <View style={styles.searchContainer}>
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search location"
//                     value={search}
//                     onChangeText={setSearch}
//                 />
//                 <Button title="Search" onPress={searchLocation} />
//             </View>
//         </View>
//         // </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     searchContainer: {
//         position: 'absolute',
//         top: 10,
//         width: '90%',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         padding: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 2,
//         elevation: 4,
//         flexDirection: 'row',
//         marginTop: '12%'
//     },
//     searchInput: {
//         flex: 1,
//         marginRight: 10,
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//     },
// });

// export default Map;

//------------------------------------------------------------------------------------------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { GOOGLE_MAPS_API_KEY } from '../config'; // Adjust the path as needed

// const Map = () => {
//     const [location, setLocation] = useState({
//         // latitude: 21.21351364600479,
//         // longitude: 72.88348488063343,
//         latitude: 21.23377709289707,
//         longitude: 72.86362785365189,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//     });

//     useEffect(() => {
//         const requestLocationPermission = async () => {
//             if (Platform.OS === 'android') {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                     {
//                         title: "Location Permission",
//                         message: "This app needs access to your location.",
//                         buttonNeutral: "Ask Me Later",
//                         buttonNegative: "Cancel",
//                         buttonPositive: "OK",
//                     }
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     getCurrentLocation();
//                 } else {
//                     console.log("Location permission denied");
//                 }
//             } else {
//                 getCurrentLocation();
//             }
//         };

//         const getCurrentLocation = () => {
//             Geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         ...location,
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                     });
//                 },
//                 (error) => {
//                     console.log(error.code, error.message);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//             );
//         };

//         requestLocationPermission();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 initialRegion={location}
//             >
//                 <Marker
//                     coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//                     title={"Current Location"}
//                     description={"This is where you are"}
//                 />
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: '100%',
//         width: '100%',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// export default Map;




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------



import React, { useEffect, useState } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAPS_API_KEY } from '../config';

const Map = () => {
    const [location, setLocation] = useState({
        latitude: 21.23377709289707,
        longitude: 72.86362785365189,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [search, setSearch] = useState('');
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app needs access to your location.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    console.log("Location permission denied");
                }
            } else {
                getCurrentLocation();
            }
        };

        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        ...location,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
    }, []);

    const searchLocation = async () => {
        if (!GOOGLE_MAPS_API_KEY) {
            console.error("Google Maps API Key is missing.");
            return;
        }

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(search)}&key=${GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setSearchedLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                // Traverse to searched location
                setLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                console.log("Location not found");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSearchSuggestions = async (query) => {
        if (!GOOGLE_MAPS_API_KEY) {
            console.error("Google Maps API Key is missing.");
            return;
        }

        if (query.length > 2) {
            const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setSearchSuggestions(data.predictions);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSearchSuggestions([]);
        }
    };

    const handleSearchSuggestionSelect = (placeId) => {
        if (!GOOGLE_MAPS_API_KEY) {
            console.error("Google Maps API Key is missing.");
            return;
        }

        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const location = data.result.geometry.location;
                setSearchedLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setSearch(data.result.formatted_address);
                setSearchSuggestions([]);

                // Traverse to selected location
                setLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            })
            .catch(error => console.error(error));
    };

    const handleCurrentLocationPress = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };
                setLocation(newLocation);
                setSearchedLocation(null);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={searchedLocation || location}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title={"Current Location"}
                    description={"This is where you are"}
                    pinColor={"blue"}
                />
                {searchedLocation && (
                    <>
                        <Marker
                            coordinate={{ latitude: searchedLocation.latitude, longitude: searchedLocation.longitude }}
                            title={"Searched Location"}
                            description={search}
                            pinColor={"red"}
                        />
                        <Polygon
                            coordinates={[
                                { latitude: searchedLocation.latitude + 0.001, longitude: searchedLocation.longitude + 0.001 },
                                { latitude: searchedLocation.latitude + 0.001, longitude: searchedLocation.longitude - 0.001 },
                                { latitude: searchedLocation.latitude - 0.001, longitude: searchedLocation.longitude - 0.001 },
                                { latitude: searchedLocation.latitude - 0.001, longitude: searchedLocation.longitude + 0.001 },
                            ]}
                            strokeColor="red"
                            fillColor="rgba(255, 0, 0, 0.2)"
                        />
                    </>
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search location"
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                        fetchSearchSuggestions(text);
                    }}
                />
                <Button title="Search" onPress={searchLocation} />
            </View>
            {searchSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {searchSuggestions.map((suggestion) => (
                        <TouchableOpacity
                            key={suggestion.place_id}
                            onPress={() => handleSearchSuggestionSelect(suggestion.place_id)}
                        >
                            <View style={styles.suggestionItem}>
                                <Text>{suggestion.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <TouchableOpacity
                style={styles.currentLocationButton}
                onPress={handleCurrentLocationPress}
            >
                <Text style={styles.currentLocationButtonText}>📍</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
        position: 'absolute',
        top: 10,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
        flexDirection: 'row',
        marginTop: '12%',
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        maxHeight: 200,
        elevation: 4,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    currentLocationButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 15,
        elevation: 4,
    },
    currentLocationButtonText: {
        fontSize: 24,
        color: 'blue',
    },
});

export default Map;


