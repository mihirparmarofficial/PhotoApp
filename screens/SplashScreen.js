import React, { useEffect, } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Auth from '@react-native-firebase/auth'
import { StackActions, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        let unsubscribe
        setTimeout(async () => {
            unsubscribe = await Auth().onAuthStateChanged(user => {
                const routeName = user !== null ? 'HomeScreen' : 'LogIn'
                navigation.navigate(routeName);
            });

        },);
        return () => unsubscribe
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.text}>Splash</Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginTop: '40%',
        alignItems: 'center',
        margin: 20, // Add margin to all sides
    },
    heading: {
        margin: 16,
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default SplashScreen;


