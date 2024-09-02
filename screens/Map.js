import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Polyline, Polygon } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../config';


export default function Map() {

    const mapRef = useRef(null);
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
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
    ])

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

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <GooglePlacesAutocomplete
                    fetchDetails={true}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // console.log(data, details);
                        // console.log(JSON.stringify(data));
                        console.log(JSON.stringify(details?.geometry?.location));
                        moveToLocation(
                            details?.geometry?.location.lat,
                            details?.geometry?.location.lng
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
                <Marker coordinate={{ latitude: 21.217338202318427, longitude: 72.86652314233199 }}>
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
                    strokeColor='#00254d' />
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
        flex: 0.5

    },
});