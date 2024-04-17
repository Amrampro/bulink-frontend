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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('M');
    const [contactType, setContactType] = useState('CLIENT');
    const [org, setOrg] = useState('');
    const [error, setError] = useState('');
    const [organizations, setOrganizations] = useState([]);

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${API.organizationReadAllFSU}/${user.id}`);
            setOrganizations(response.data);
        } catch (error) {
            console.error('Error fetching organizations:', error);
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

    const handleAddClient = async () => {
        try {
            const newClient = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                about: about,
                address: address,
                country: country,
                gender: gender,
                contactType: contactType,
                organization_id: org
            };

            const response = await axios.post(API.clientCreate, newClient);

            if (response.data.includes('Success')){
                Alert.alert('Success', '' + response.data);
                navigation.goBack();
            } else {
                Alert.alert('Error', response.data);
                setError(response.data)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add client. Please try again. ' + error.message);
        }
    };


    return (
        <SafeAreaView style={{backgroundColor: '#f2f2f2'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>Register under Organization</Text>
                    <Picker
                        selectedValue={org}
                        onValueChange={(itemValue) => setOrg(itemValue)}
                        style={{ borderWidth: 1, borderColor: 'black' }}
                    >
                        {organizations.map((organization) => (
                            <Picker.Item
                                key={organization.orgId}
                                label={organization.name}
                                value={organization.orgId}
                            />
                        ))}
                    </Picker>
                    <Text style={styles.formLabel}>Contact Type</Text>
                    <Picker
                        selectedValue={contactType}
                        onValueChange={(itemValue) => setContactType(itemValue)}
                        style={{ borderWidth: 1, borderColor: 'black' }}
                    >
                        <Picker.Item label="CLIENT" value="CLIENT"/>
                        <Picker.Item label="COMPANY" value="COMPANY"/>
                        <Picker.Item label="EMPLOYEE" value="EMPLOYEE"/>
                        <Picker.Item label="OTHER" value="OTHER"/>
                    </Picker>
                    <Text style={styles.formLabel}>First Name</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter first name"
                        onChangeText={(text) => setFirstName(text)}
                    />

                    <Text style={styles.formLabel}>Last Name (or Name of Company)</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter last name"
                        onChangeText={(text) => setLastName(text)}
                    />

                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter email"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <Text style={styles.formLabel}>Phone (Include country code like: +32, +237,...)</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="ex: +32 470 92 78 70"
                        onChangeText={(text) => setPhone(text)}
                    />

                    <Text style={styles.formLabel}>About</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter about information"
                        onChangeText={(text) => setAbout(text)}
                    />

                    <Text style={styles.formLabel}>Address</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter address"
                        onChangeText={(text) => setAddress(text)}
                    />

                    <Text style={styles.formLabel}>Country</Text>
                    <TextInput
                        style={styles.formInput}
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
                    { error ? (
                        <View style={styles.errorBox}>
                            <Text>{error}</Text>
                        </View>
                    ) : ( <Text></Text> ) }

                    <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
                        <Text style={styles.addButtonText}>Add Client</Text>
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
