import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import COLORS from '../../../constants/colors';
import API from '../../../constants/api';
import {useAuth} from "../../auth/AuthContext";

export default function GenerateReport({navigation}) {
    const { user } = useAuth();

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


    const handleGeneratePDF = async () => {
        alert('Will soon be available...')
    };


    return (
        <SafeAreaView style={{backgroundColor: '#f2f2f2'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>Chose your desired company below</Text>
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
                    

                    <TouchableOpacity style={styles.addButton} onPress={handleGeneratePDF}>
                        <Text style={styles.addButtonText}>Generate the report</Text>
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
