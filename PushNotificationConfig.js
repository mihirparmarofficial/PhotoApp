import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotification.FetchResult.NoData);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
});

// Create a channel if it doesn't exist (Android O and above)
PushNotification.createChannel(
    {
        channelId: "default-channel-id", // (required)
        channelName: "Default channel", // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);
