import React, { useEffect, useRef, useState } from 'react'
import { Image, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Polyline, Polygon } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../config';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';


export default function MapDirections() {

    const mapRef = useRef(null);
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [permissionGranter, setPermissionGranter] = useState(false);
    const [markersList, setMarkersList] = useState([
        {
            id: 1,
            latitude: 21.233718258150695,
            longitude: 72.86364817354561,
            title: 'Alphaved',
            description: 'You are Here.',
        },
        {
            id: 2,
            latitude: 21.21346863775277,
            longitude: 72.88357071220075,
            title: 'royal Heaven',
            description: 'Your Home.',
        },
    ]);

    useEffect(() => {
        _getLocationPermission();
    }, [])

    async function _getLocationPermission() {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message:
                            'Please allow Location permission to continue!',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                // console.log(granted)r
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranter(true);
                    _getCurrentLocation();
                    console.log('Location permission granted');
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (Platform.OS === 'ios') {
            GetLocation.requestAuthorization(
                () => {
                    console.log('Success');
                },
                () => {
                    console.log('Failed');

                }
            );
        }
    };

    function _getCurrentLocation() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log('My current location is : ', location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }


    const MyCustomMarkerView = () => {
        return (
            <Image source={require('../src/assets/pin2.png')} style={{ height: 45, width: 45 }} />
        )
    }

    const MyCustomCalloutView = () => {
        return (
            <View >
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                    Kapodra Circle
                </Text>
            </View>
        )
    }

    async function moveToLocation(latitude, longitude) {
        mapRef.current.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            2000,
        );
    }

    if (!permissionGranter) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>Please allow Location permission to continue!</Text>
            </View>
        )

    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={{ flex: 0.5 }}>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder='From'
                        onPress={(data, details = null) => {
                            let originCordinates = {
                                latitude: details?.geometry?.location.lat,
                                longitude: details?.geometry?.location.lng
                            }
                            setOrigin(originCordinates);
                            moveToLocation(
                                originCordinates
                            );
                        }}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en',
                        }}
                        onFail={error =>
                            console.error(error)
                        }
                    />
                </View>
                <View style={{ flex: 0.5, marginLeft: 6 }}>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder='To'
                        onPress={(data, details = null) => {
                            let destinationCordinates = {
                                latitude: details?.geometry?.location.lat,
                                longitude: details?.geometry?.location.lng
                            }
                            setDestination(destinationCordinates);
                            moveToLocation(
                                destinationCordinates
                            );
                        }}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en',
                        }}
                        onFail={error =>
                            console.error(error)
                        }
                    />
                </View>
            </View>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 21.233718258150695,
                    longitude: 72.86364817354561,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}>
                {origin != undefined ? (<Marker coordinate={origin} />) : null}
                {destination != undefined ? (<Marker coordinate={destination} />) : null}
                {/* <Marker coordinate={{ latitude: 21.217338202318427, longitude: 72.86652314233199 }}>
                    <MyCustomMarkerView />
                    <Callout style={{ width: 100, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <MyCustomCalloutView />
                    </Callout>
                </Marker>
                {markersList.map((marker) => {
                    return (
                        <Marker
                            draggable
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.title}
                            description={marker.description}
                            onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
                        />)
                })}
                <Circle center={{
                    latitude: 21.23162776450073,
                    longitude: 72.86636031876047
                }}
                    radius={200}
                    fillColor='#ebf5fb'
                    strokeColor='#00254d'
                />
                <Polyline coordinates={[
                    {
                        latitude: 21.217338202318427,
                        longitude: 72.86652314233199
                    },
                    {
                        latitude: 21.21346863775277,
                        longitude: 72.88357071220075,
                    }
                ]}
                    strokeWidth={3}
                    strokeColor='#00254d' />
                <Polygon coordinates={[
                    {
                        latitude: 21.220865034893027,
                        longitude: 72.86230686149236
                    },
                    {
                        latitude: 21.22039395073683,
                        longitude: 72.86005606332598
                    },
                    {
                        latitude: 21.219181950525197,
                        longitude: 72.86227070767157
                    },

                    {
                        latitude: 21.22038396457598,
                        longitude: 72.86426216534421
                    }
                ]}
                    fillColor='#ebf5fb'
                    strokeColor='#00254d' /> */}
                {origin != undefined && destination != undefined ? (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        strokeColor='#00254d'
                        strokeWidth={3}
                        apikey={GOOGLE_MAPS_API_KEY}
                    />) : null}
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    search: {
        zIndex: 1,
        flex: 0.5,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
    },
});