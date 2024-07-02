import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import {Picker} from '@react-native-picker/picker';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import COLORS from '../../../constants/colors';
import API from '../../../constants/api';
import {useAuth} from "../../auth/AuthContext";


export default function CreateMyCompany({navigation}) {

    const serverUrl = `${API.organizationReadAll}`;

    const { user } = useAuth();

    const [userDetails, setUser] = useState(null);

    const [name, setName] = useState();
    const [slogan, setSlogan] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('')
    const [managerId, setManagerId] = useState();

    const [image, setImage] = useState(null);

    const userId = user.id;

    const handleCreateCompany = async () => {
        try {
            const newCompany = {
                name: name,
                slogan: slogan,
                type: type,
                manager_id: userId,
            };

            const response = await axios.post(serverUrl, newCompany)
            // console.log(response.data)

            if (response.data.includes('Organization created')){
                Alert.alert('Success', '' + response.data);
                navigation.navigate("MyCompanies")
            } else {
                // console.log(response.data)
                Alert.alert('Message', response.data);
                setError(response.data)
                // console.log(error.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Some errors are detected : ' + error.message);
            console.log(error.message);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.All,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView style={{backgroundColor: '#f2f2f2'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>

                    { error ? (
                        <View style={styles.errorBox}>
                            <Text>{error}</Text>
                        </View>
                    ) : ( <Text></Text> ) }

                    <Text style={styles.formLabel}>Company Name</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter the name of your company"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <Text style={styles.formLabel}>Slogan</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter your slogan"
                        value={slogan}
                        onChangeText={(text) => setSlogan(text)}
                    />

                    <Text style={styles.formLabel}>Enter the category of your company</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="ex: Haire style and beauty"
                        value={type}
                        onChangeText={(text) => setType(text)}
                    />

                    {/*<Text style={styles.formLabel}>Gender</Text>*/}
                    {/*<Picker*/}
                    {/*    selectedValue={gender}*/}
                    {/*    onValueChange={(itemValue) => setGender(itemValue)}*/}
                    {/*    style={{ borderWidth: 1, borderColor: 'black' }}*/}
                    {/*>*/}
                    {/*    <Picker.Item label="Male" value="M"/>*/}
                    {/*    <Picker.Item label="Female" value="F"/>*/}
                    {/*    <Picker.Item label="Undefined" value="U"/>*/}
                    {/*</Picker>*/}

                    <Text style={styles.formLabel}>Company Logo</Text>
                    <TouchableOpacity
                        style={styles.imageSelectorButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.imageSelectorButtonText}>Select a Logo</Text>
                    </TouchableOpacity>

                    {image && (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    )}

                    <TouchableOpacity style={styles.addButton} onPress={handleCreateCompany}>
                        <Text style={styles.addButtonText}>Create company</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
    formInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    formTextArea: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    imageSelectorButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    imageSelectorButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    selectedImage: {
        width: 150,
        height: 150,
        marginTop: 10,
        borderRadius: 8,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    errorBox: {
        backgroundColor: "rgba(255,26,26,0.5)",
        padding: 15,
        borderRadius: 5
    }
});
