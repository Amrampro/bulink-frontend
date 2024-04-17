import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch, Linking,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import API from '../../constants/api'
import axios from "axios";
import {useAuth} from "../auth/AuthContext";

const SECTIONS = [
    {
        header: 'Companies',
        items: [
            { id: 'myenterprise', icon: 'bar-chart-2', label: 'My Companies', type: 'link' },
        ],
    },
    {
        header: 'Preferences',
        items: [
            { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
            // { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
            { id: 'wifi', icon: 'wifi', label: 'Autosave Data Online', type: 'toggle' },
        ],
    },
    {
        header: 'Content',
        items: [
            { id: 'savecsv', icon: 'save', label: 'CSV Export', type: 'link' },
            { id: 'generateReport', icon: 'download', label: 'My Enterprise Report', type: 'link' },
        ],
    },
    {
        header: 'Help',
        items: [
            { id: 'bug', icon: 'flag', label: 'Report Bug', type: 'link' },
            { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' },
        ],
    },
    {
        header: 'Other',
        items: [
            { id: 'terms-and-condition', icon: 'file-text', label: 'Terms & Conditions', type: 'link' },
            { id: 'logout', icon: 'log-out', label: 'Log out', type: 'link' },
        ],
    },
];

export default function Settings({ navigation }) {
    const [form, setForm] = useState({
        language: 'English',
        darkMode: false,
        wifi: false,
    });

    const [darkModeEnabled, setDarkModeEnabled] = useState(true);
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await axios.post(API.signout)
            navigation.navigate('Login')
        } catch (err) {
            alert(err.message)
            console.error(err.message)
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profile}>
                    <Image
                        alt=""
                        source={{
                            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                        }}
                        style={styles.profileAvatar}
                    />

                    <Text style={styles.profileName}>{user.username}</Text>

                    <Text style={styles.profileEmail}>{user.email}</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditProfile", { paramKey: user.id })}
                        // onPress={() => {
                        //     // handle onPress
                        // }}
                    >
                        <View style={styles.profileAction}>
                            <Text style={styles.profileActionText}>Edit Profile</Text>

                            <FeatherIcon color="#fff" name="edit" size={16} />
                        </View>
                    </TouchableOpacity>
                </View>
                {SECTIONS.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            {items.map(({ id, label, icon, type, value }, index) => {
                                return (
                                    <View
                                        key={id}
                                        style={[
                                            styles.rowWrapper,
                                            index === 0 && { borderTopWidth: 0 },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (type === 'link') {
                                                    // Open the link based on the id
                                                    switch (id) {
                                                        case 'bug':
                                                            Linking.openURL('https://myprofessional.com/bug').then(r => null);
                                                            break;
                                                        case 'contact':
                                                            Linking.openURL('https://myprofessional.com/contact');
                                                            break;
                                                        case 'logout':
                                                            handleLogout();
                                                            break;
                                                        case 'savecsv':
                                                            Linking.openURL(`${API.exportCsv}/${user.id}`);
                                                            break;
                                                        case 'terms-and-condition':
                                                            Linking.openURL('https://bulink.goulbam.com/terms-and-conditions.php').then(r => null);
                                                            break;
                                                        case 'myenterprise':
                                                            navigation.navigate("MyCompanies", { paramKey: user.id });
                                                            // Linking.openURL(`${API.organizationReadAllFSU}/${user.id}`);
                                                            break;
                                                        case 'generateReport':
                                                            navigation.navigate("GenerateReport")
                                                        // Add more cases if needed
                                                        default:
                                                            break;
                                                    }
                                                } else {
                                                    // handle other onPress actions
                                                }
                                            }}
                                        >
                                            <View style={styles.row}>
                                                <FeatherIcon
                                                    color="#616161"
                                                    name={icon}
                                                    style={styles.rowIcon}
                                                    size={22}
                                                />

                                                <Text style={styles.rowLabel}>{label}</Text>

                                                <View style={styles.rowSpacer} />

                                                {type === 'select' && (
                                                    <Text style={styles.rowValue}>{form[id]}</Text>
                                                )}

                                                {type === 'toggle' && (
                                                    <Switch
                                                        onChange={val => setForm({ ...form, [id]: val })}
                                                        value={form[id]}
                                                        disabled={id === 'darkMode' && !darkModeEnabled}
                                                    />
                                                )}

                                                {(type === 'select' || type === 'link') && (
                                                    <FeatherIcon
                                                        color="#ababab"
                                                        name="chevron-right"
                                                        size={22}
                                                    />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    profile: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
    },
    profileName: {
        marginTop: 12,
        fontSize: 20,
        fontWeight: '600',
        color: '#090909',
    },
    profileEmail: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '400',
        color: '#848484',
    },
    profileAction: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 12,
    },
    profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
        height: 50,
    },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowIcon: {
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});
