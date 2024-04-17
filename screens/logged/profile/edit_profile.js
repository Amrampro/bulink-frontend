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


export default function ContactsAdd({navigation}) {

    const { user } = useAuth();

    const [userDetails, setUser] = useState(null);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [gender, setGender] = useState('M');
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const [image, setImage] = useState(null);

    var userInfo = null

    const serverUrl = `${API.getUser}/${user.id}`;

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(serverUrl)

                 userInfo = response.data
                console.log(userInfo)
                // console.log(userInfo.phone); // This can work
                // console.log(userInfo['phone']); // This second mathod too can work
                setUsername(userInfo.username)
                setFirstName(userInfo.first_name)
                setLastName(userInfo.last_name)
                setEmail(userInfo.email)
                setPhone(userInfo.phone)
                setAbout(userInfo.about)
                setAddress(userInfo.address)
                setCountry(userInfo.country)
                setGender(userInfo.gender)

                // console.log(userInfo.first_name)
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch user. Please try again. ' + error.message);
            } finally {
                // If the load exists
                // setLoading(false);
            }
        };

        getUser();
    }, [user.id]);
    // }, [route.params.paramKey]);

    const handleUpdateUser = async () => {
        try {
            const updateUser = {
                first_name: firstName,
                last_name: lastName,
                // email: email,
                // username: username,
                phone: phone,
                about: about,
                address: address,
                country: country,
                gender: gender,
                organization_id: 1
            };

            const response = await axios.put(serverUrl, updateUser)
            // console.log(response.data)

            if (response.data.includes('successfully')){
                Alert.alert('Success', '' + response.data);
                navigation.navigate("MainUi")
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

                    <Text style={styles.formLabel}>Username (@{user.username})</Text>
                    <Text style={styles.formLabel}>First Name</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter first name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    {/*<Text>{user.lastName}</Text>*/}

                    <Text style={styles.formLabel}>Last Name</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter last name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />

                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginTop: 10,
                        color:"red"
                    }}>Email (CAN'T BE CHANGED !)</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <Text style={styles.formLabel}>Phone (Include country code like: +32, +237,...)</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="ex: +32 470 92 78 70"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />

                    <Text style={styles.formLabel}>About</Text>
                    <TextInput
                        style={styles.formTextArea}
                        multiline={true}
                        numberOfLines={5}
                        value={about}
                        placeholder="Enter about information"
                        onChangeText={(text) => setAbout(text)}
                    />

                    <Text style={styles.formLabel}>Address</Text>
                    <TextInput
                        style={styles.formInput}
                        value={address}
                        placeholder="Enter address"
                        onChangeText={(text) => setAddress(text)}
                    />

                    <Text style={styles.formLabel}>Country</Text>
                    <TextInput
                        style={styles.formInput}
                        value={country}
                        placeholder="Enter country"
                        onChangeText={(text) => setCountry(text)}
                    />

                    <Text style={styles.formLabel}>Gender</Text>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={{ borderWidth: 1, borderColor: 'black' }}
                    >
                        <Picker.Item label="Male" value="M"/>
                        <Picker.Item label="Female" value="F"/>
                        <Picker.Item label="Undefined" value="U"/>
                    </Picker>

                    <Text style={styles.formLabel}>Contact Image/Logo</Text>
                    <TouchableOpacity
                        style={styles.imageSelectorButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.imageSelectorButtonText}>Select Image</Text>
                    </TouchableOpacity>

                    {image && (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    )}

                    <TouchableOpacity style={styles.addButton} onPress={handleUpdateUser}>
                        <Text style={styles.addButtonText}>Update Info</Text>
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
