import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Platform, Alert, StyleSheet, Image, } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const FileUpload = () => {
    const [fileData, setFileData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const selectDocs = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                copyTo: 'cachesDirectory',
            });
            console.log(results);
            setFileData(results);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('User cancelled the upload', error);
            } else {
                console.log(error);
            }
        }
    };

    const uploadDocs = async () => {
        // for (const file of fileData) {
        //     const { uri } = file;
        //     const filename = uri.substring(uri.lastIndexOf('/') + 1);
        //     let uploadUri = uri;

        //     if (Platform.OS === 'android') {
        //         try {
        //             const uriComponents = uri.split('/');
        //             const fileName = uriComponents[uriComponents.length - 1];
        //             const newUri = `${DocumentDirectoryPath}/${fileName}`;
        //             const fileCopy = await RNFS.copyFile(uri, newUri);
        //             uploadUri = newUri;
        //         } catch (error) {
        //             console.log('Error copying file:', error);
        //             return;
        //         }
        //     }
        //     setUploading(true);
        //     setTransferred(0);
        //     const task = storage().ref(filename).putFile(uploadUri);
        //     task.on('state_changed', snapshot => {
        //         setTransferred(
        //             Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //         );
        //     });
        //     try {
        //         await task;
        //     } catch (e) {
        //         console.error(e);
        // }
        // }
        // setUploading(false);
        // Alert.alert(
        //     'Upload Complete!',
        //     'Your files have been uploaded to Firebase Cloud Storage!'
        // );
        // setFileData([]);

        const pathToFile = fileData[0].fileCopyUri;
        // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
        try {
            const task = storage().ref(`/uploads/${fileData[0].name}`).putFile(pathToFile);
            //  await storage().ref(fileData[0].name).putFile(pathToFile);
            task.on('state_changed', snapshot => {
                console.log(`Uploading ${Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)} % done !`)
                setFileData([])
            });
        } catch (error) {
            console.log('error----> ', error)
        }

    };

    const renderItem = ({ item }) => (
        <View style={{ padding: RFValue(10), borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', height: 'auto', }}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: item.fileCopyUri }}></Image>
            <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black' }}>{item.name}</Text></View>
        </View>
    );

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <View>
                <Text style={{ color: 'black', fontSize: RFValue(28), textAlign: 'center', marginTop: RFValue(25), fontWeight: '700' }}>Document Picker</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: RFValue(10) }}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={selectDocs}>
                    <Text style={styles.txt}>Select Files</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {fileData.length > 0 ? (
                    <FlatList
                        data={fileData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ paddingHorizontal: RFValue(20) }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No Files Selected</Text>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center', marginVertical: RFValue(20) }}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={uploadDocs}>
                    <Text style={styles.txt}>Upload Files</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1.5, borderColor: 'black', borderRadius: 10, width: '93%', height: 45, alignItems: 'center', justifyContent: 'center', padding: 5
    },
    txt: {
        fontWeight: '700', fontSize: 25, color: 'black'
    },
})

export default FileUpload;

