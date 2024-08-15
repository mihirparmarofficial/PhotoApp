import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import storage from '@react-native-firebase/storage';

const FileUpload = () => {
    const [fileData, setFileData] = useState([]);

    // Function to select multiple files
    const selectDocs = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true
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

    // Function to upload selected files
    const uploadDocs = async () => {
        if (fileData.length === 0) {
            console.log("No files selected");
            return;
        }

        try {
            const uploadTasks = fileData.map(async file => {
                const { uri, name } = file;
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const reference = storage().ref(`/uploads/${name}`);
                const task = reference.putFile(uploadUri);

                return new Promise((resolve, reject) => {
                    task.on('state_changed',
                        taskSnapshot => {
                            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                        },
                        reject, // Handle errors here
                        async () => {
                            const downloadUrl = await reference.getDownloadURL();
                            resolve(downloadUrl);
                        }
                    );
                });
            });

            const downloadUrls = await Promise.all(uploadTasks);
            console.log('All files uploaded successfully:', downloadUrls);
            setFileData([]);
        } catch (error) {
            console.error('File upload error: ', error);
        }
    };

    // Function to render selected files
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: RFValue(10) }}>
            <Image source={{ uri: item.uri }} style={{ height: RFValue(50), width: RFValue(50), marginRight: RFValue(10) }} />
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <View>
                <Text style={{ color: 'black', fontSize: RFValue(28), textAlign: 'center', marginTop: RFValue(25), fontWeight: '700' }}>Document Picker</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: RFValue(10) }}>
                <TouchableOpacity
                    style={{ borderWidth: RFValue(1.5), borderColor: 'black', borderRadius: RFValue(10), width: '80%' }}
                    onPress={selectDocs}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: RFValue(10) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: RFValue(17), color: 'black' }}>Select Files</Text>
                    </View>
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
                    style={{ borderWidth: RFValue(1.5), borderColor: 'black', borderRadius: RFValue(10), width: '80%' }}
                    onPress={uploadDocs}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: RFValue(10) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: RFValue(17), color: 'black' }}>Upload Files</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FileUpload;







