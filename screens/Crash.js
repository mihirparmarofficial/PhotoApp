// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
// import { RFValue } from 'react-native-responsive-fontsize';
// import crashlytics from '@react-native-firebase/crashlytics';

// const Crash = ({ navigation }) => {
//     const [isCrashlyticsEnabled, setIsCrashlyticsEnabled] = useState(true);

//     const handleToggleSwitch = () => {
//         setIsCrashlyticsEnabled(previousState => !previousState);
//     };

//     const forceCrash = () => {
//         if (isCrashlyticsEnabled) {
//             crashlytics().log('Crash button was pressed.');
//         } else {
//             console.log('Crashlytics is disabled. Logging locally instead.');
//         }
//         throw new Error('This is a forced crash for testing Crashlytics!');
//     };

//     return (
//         <SafeAreaView>
//             <View style={{ height: '100%', padding: 20, marginTop: '45%' }}>
//                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
//                     <Text style={{ fontWeight: 'bold', fontSize: RFValue(24), color: 'black' }}>
//                         Welcome to Crashlytics!
//                     </Text>
//                     <Text style={{ fontSize: RFValue(17), color: 'black', marginVertical: 10 }}>
//                         Let's Make a Force Crash!
//                     </Text>
//                 </View>
//                 <View style={{ flex: 3, alignItems: 'center', width: '100%' }}>
//                     <TouchableOpacity
//                         style={{ borderWidth: 1.5, borderColor: 'grey', borderRadius: 10, width: '90%' }}
//                         onPress={forceCrash}
//                     >
//                         <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
//                             <Text style={{ fontWeight: 'bold', fontSize: RFValue(18), color: 'black' }}>Crash the App</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }

// export default Crash;





// import React from 'react';
// import { View, Button, StyleSheet } from 'react-native';

// const App = () => {
//     const handleCrash = () => {
//         throw new Error('Test Crash'); // Force a crash
//     };

//     return (
//         <View style={styles.container}>
//             <Button
//                 title="Test Crash"
//                 onPress={handleCrash}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default App;



import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import crashlytics from '@react-native-firebase/crashlytics';

const Crash = ({ navigation }) => {
    const [isCrashlyticsEnabled, setIsCrashlyticsEnabled] = useState(true);

    const handleToggleSwitch = () => {
        setIsCrashlyticsEnabled(previousState => !previousState);
    };

    const forceCrash = () => {
        if (isCrashlyticsEnabled) {
            crashlytics().log('Crash button was pressed.');
        } else {
            console.log('Crashlytics is disabled. Logging locally instead.');
        }
        throw new Error('This is a forced crash for testing Crashlytics!');
    };

    return (
        <SafeAreaView>
            <View style={{ height: '100%', padding: 20, marginTop: '65%' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: RFValue(24), color: 'black' }}>
                        Welcome to Crashlytics!
                    </Text>
                    <Text style={{ fontSize: RFValue(17), color: 'black', marginVertical: 10 }}>
                        Let's Make a Force Crash!
                    </Text>
                </View>
                <View style={{ alignItems: 'center', width: '100%', marginTop: '12%' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1.5, borderColor: 'grey', borderRadius: 10, width: '90%' }}
                        onPress={forceCrash}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: RFValue(18), color: 'black' }}>
                                Crash the App
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Crash;
