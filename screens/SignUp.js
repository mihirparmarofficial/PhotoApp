import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import '../PushNotificationConfig';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const db = firestore();

    // const signInAnonymously = async () => {
    //     await firebase.auth().signInAnonymously();
    // }

    // PushNotification - Start
    const [fcmToken, setFcmToken] = useState(null);

    useEffect(() => {
        console.log("This is my FcmToken: ", fcmToken);
    }, [fcmToken]);

    const checkFcm = async () => {
        try {
            const fcm = await messaging().getToken();
            setFcmToken(fcm);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkFcm();
        // signInAnonymously(); //signINAnnonymously
    }, []);
    // PushNotification - End


    const handleSignup = async () => {
        try {
            if (email.length > 0 && password.length > 0 && name.length > 0) {
                const response = await auth().createUserWithEmailAndPassword(email, password);
                setMessage('');

                const userData = {
                    id: response.user.uid,
                    name: name,
                    email: email,
                    fcm: fcmToken,
                };

                console.log('User data to save: ', userData);

                await firestore().collection('NewUsers').doc(response.user.uid).set(userData);
                console.log('User data saved successfully');

                await auth().currentUser.sendEmailVerification();
                await auth().signOut();
                Alert.alert('Please verify your Email');
                navigation.navigate('LogIn');
            } else {
                Alert.alert('Please add Data');
            }
        } catch (err) {
            console.log('Error saving user data to Firestore:', err);
            setMessage(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.text}>Sign Up</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={{ height: 50, width: '100%' }}>
                <TouchableOpacity
                    style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, width: '100%' }}
                    onPress={handleSignup}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'red' }}>{message}</Text>
            <TouchableOpacity
                style={{ marginTop: 'auto' }}
                onPress={() => navigation.navigate('LogIn')}>
                <View style={{ flexDirection: 'row' }}>
                    <Text> Already have an Account? </Text>
                    <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '60%',
        alignItems: 'center',
        margin: 20,
    },
    input: {
        width: '100%',
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
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

export default SignUp;



