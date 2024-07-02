// MyCompanies.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import COLORS from '../../../constants/colors'
import {useFocusEffect} from "@react-navigation/native";
import API from "../../../constants/api";
import {useAuth} from "../../auth/AuthContext";

const MyCompanies = ({ navigation }) => {
    const { user } = useAuth();

    const serverUrl = `${API.organizationReadAllFSU}/${user.id}`

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadCompanies();
    }, []);

    // Use the useFocusEffect hook to reload companies when the screen gains focus
    useFocusEffect(
        React.useCallback(() => {
            loadCompanies();
        }, [])
    );

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const result = await axios.get(serverUrl);
            setCompanies(result.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch companies. Please try again. ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredCompanies = companies.filter(
        (company) =>
            company.name.toLowerCase().includes(filter.toLowerCase())
            // company.firstName.toLowerCase().includes(filter.toLowerCase())
    );

    const groupedCompanies = filteredCompanies.reduce((acc, company) => {
        const [name] = company.name.split(' ').reverse();
        const firstLetter = name.charAt(0).toUpperCase();

        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }

        acc[firstLetter].push(company);
        return acc;
    }, {});

    return (
        <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ padding: 22, paddingTop: 0 }}>
                    <View style={styles.searchInputContainer}>
                        <FeatherIcon name="search" size={20} color={COLORS.black} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search by company name"
                            placeholderTextColor={COLORS.black}
                            style={styles.searchInput}
                            onChangeText={(text) => setFilter(text)}
                        />
                    </View>
                </View>

                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" style={styles.preloader} />
                    </View>
                ) : (
                    Object.entries(groupedCompanies).map(([letter, sectionCompanies]) => (
                        <View style={styles.section} key={letter}>
                            {sectionCompanies.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>{letter}</Text>
                                    <View style={styles.sectionItems}>
                                        {sectionCompanies.map((company) => (
                                            <View key={company.orgId} style={styles.cardWrapper}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('EditMyCompany', { paramKey: company.orgId })}
                                                >
                                                    <View style={styles.card}>
                                                        {company.image ? (
                                                            <Image alt="" resizeMode="cover" source={{ uri: company.image }} style={styles.cardImg} />
                                                        ) : (
                                                            <View style={[styles.cardImg, styles.cardAvatar]}>
                                                                <Text style={styles.cardAvatarText}>{company.name[0]}</Text>
                                                            </View>
                                                        )}

                                                        <View style={styles.cardBody}>
                                                            <Text style={styles.cardTitle}>
                                                                {company.name.toUpperCase()}
                                                            </Text>
                                                            {company.type ? <Text style={styles.cardPhone}>{company.type}</Text> : ''}
                                                            {/*<Text style={styles.cardPhone}>{company.type}</Text>*/}
                                                        </View>

                                                        <View style={styles.cardAction}>
                                                            <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>

            {loading ? (
                ''
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('CreateMyCompany')} style={styles.addNewElement}>
                    <Image style={styles.floatingButton} source={require('../../../assets/imgs/add.png')} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        width: '100%',
    },
    header: {
        paddingHorizontal: 24,
    },
    section: {
        marginTop: 12,
        paddingLeft: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    sectionItems: {
        marginTop: 8,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    card: {
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardWrapper: {
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    cardImg: {
        width: 42,
        height: 42,
        borderRadius: 12,
    },
    cardAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardBody: {
        marginRight: 'auto',
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    cardPhone: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        color: '#616d79',
        marginTop: 3,
    },
    cardAction: {
        paddingRight: 16,
    },
    loading: {
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preloader: {
        backgroundColor: 'rgba(255, 255, 255,.8)',
        padding: 20,
        borderRadius: 5,
        marginTop: -100
    },

    // ---------------------- Floating button ---------------
    addNewElement: {
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30
    },
    floatingButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
});

export default MyCompanies;
