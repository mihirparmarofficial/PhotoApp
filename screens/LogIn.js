import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import '../PushNotificationConfig';

const LogIn = () => {
    const [email, setEmail] = useState('mihirparmar.0511@gmail.com');
    const [password, setPassword] = useState('123456');
    const [message, setMessage] = useState('');

    const navigation = useNavigation();
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
    }, []);
    // PushNotification - End
    const handleSignin = async () => {

        try {
            if (email.length > 0 && password.length > 0) {
                const user = await auth().signInWithEmailAndPassword(email, password);
                console.log(user);

                if (user.user.emailVerified) {
                    alert('Your Email is verified');
                    navigation.navigate('HomeScreen');
                } else {
                    alert('Please verify your Email');
                    await auth().currentUser.sendEmailVerification();
                    await auth().signOut();
                }
            } else {
                alert('Please add Data');
            }
        } catch (err) {
            console.log(err);
            setMessage(err.message);
        }

    };


    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.text}>Sign In</Text>
            </View>
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
                    style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 10,
                        width: '100%',
                    }}
                    onPress={handleSignin}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}> Sign In</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={{ color: 'red' }}>{message}</Text>

            <TouchableOpacity
                style={{ marginTop: 'auto' }}
                onPress={() => navigation.navigate('SignUp')}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text>Don't have an Account ? </Text>
                    <Text style={{ fontWeight: 'bold' }}> Sign Up</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '75%',
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

export default LogIn;

