import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  requestAndroidNotificationPermission,
  requestIosNotificationPermission,
  subscribeTopic,
} from './Notifications';
import { notificationHandler } from './NotificationHandler';
import PushNotification from 'react-native-push-notification';
import Geolocation from 'react-native-geolocation-service';



import ImagePicker from './screens/ImagePicker';
import FileUpload from './screens/FileUpload';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import Crash from './screens/Crash';
import Map from './screens/Map';
import MapDirections from './screens/MapDirections';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    createChannels();
    requestNotificationPermission();
    getDeviceToken();
    notificationHandler();
    subscribeTopic('General');
    requestLocationPermission();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'fcm_fallback_notification_channel',
      channelName: 'Notification',
    });
  };

  const getDeviceToken = async () => {
    try {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging()
        .getToken()
        .then(token => {
          // console.log('device --->', token);
        });
    } catch (e) {
      console.log('ERORRFCM==>', e);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      requestIosNotificationPermission();
    } else {
      requestAndroidNotificationPermission();
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
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
          console.log("Location permission granted");
          // Proceed with accessing location
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const result = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        if (result === RESULTS.GRANTED) {
          console.log("Location permission granted");
          // Proceed with accessing location
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SplashScreen'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='ImagePicker' component={ImagePicker} />
        <Stack.Screen name='FileUpload' component={FileUpload} />
        <Stack.Screen name='LogIn' component={LogIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Crash' component={Crash} />
        <Stack.Screen name='Map' component={Map} />
        <Stack.Screen name='MapDirections' component={MapDirections} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




