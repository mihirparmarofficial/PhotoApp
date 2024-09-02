import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Auth from '@react-native-firebase/auth'


const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={{ height: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', marginTop: '60%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>Welcome to Home Screen!</Text>
                </View>
                <View style={{ flex: 10, alignItems: 'center', height: '80%', width: '100%', }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Crash')}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={styles.txt}>Crashlytics</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('FileUpload')}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={styles.txt}>File Upload</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Map')}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={styles.txt}>Map</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('MapDirections')}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={styles.txt}>Map Directions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Camera')}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={styles.txt}>Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderWidth: 1.5, borderColor: 'red', borderRadius: 10, width: '93%', height: 45, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                        onPress={async () => {
                            await Auth().signOut();
                            navigation.navigate('LogIn');
                        }}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: 'red' }}>Log out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1.5, borderColor: 'grey', borderRadius: 10, width: '93%', height: 45, alignItems: 'center', justifyContent: 'center', marginTop: 20
    },
    txt: {
        fontWeight: '700', fontSize: 20, color: 'black'
    },
})

export default HomeScreen;