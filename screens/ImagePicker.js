import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = () => {
    const [cameraPhoto, setCameraPhoto] = useState(null);
    const [galleryPhoto, setGalleryPhoto] = useState(null);
    useEffect(() => {
        requestCameraPermission();
    }, []);
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera to take photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const openCamera = async () => {
        const options = {
            mediaType: 'photo',
            saveToPhotos: true,
        };

        try {
            const result = await launchCamera(options);
            if (!result.didCancel) {
                console.log('Camera result:', result);
                setCameraPhoto(result.assets[0].uri);
            } else {
                console.log('User cancelled camera');
            }
        } catch (err) {
            console.warn('Error launching camera:', err);
        }
    };

    const openGallery = async () => {
        const options = {
            mediaType: 'photo',
        };

        try {
            const result = await launchImageLibrary(options);
            if (!result.didCancel) {
                console.log('Gallery result:', result);
                setGalleryPhoto(result.assets[0].uri);
            } else {
                console.log('User cancelled gallery');
            }
        } catch (err) {
            console.warn('Error opening image library:', err);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.text}>Image Picker</Text>
            </View>
            <TouchableOpacity
                style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10, width: '100%' }}
                onPress={openCamera}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}>Take Image</Text>
                </View>
            </TouchableOpacity>
            {cameraPhoto && <Image style={{ height: 200, width: 200, marginTop: 10 }} source={{ uri: cameraPhoto }} />}
            <TouchableOpacity
                style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10, width: '100%', marginTop: 10 }}
                onPress={openGallery}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}>Select Image</Text>
                </View>
            </TouchableOpacity>
            {galleryPhoto && <Image style={{ height: 200, width: 200, marginTop: 10 }} source={{ uri: galleryPhoto }} />}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    heading: {
        margin: 20,
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        ...Platform.select({
            'android': {

            },
            'ios': {}
        })
    },

});

export default ImagePicker;

