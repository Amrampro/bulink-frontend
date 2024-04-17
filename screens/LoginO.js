import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Button from '../components/Button';
import COLORS from '../constants/colors';
import API from '../constants/api';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const loginUser = async () => {
        try {
            const response = await axios.post(API.login, {
                username: email,
                password: password,
            });

            // If login is successful, you can handle the response here.
            console.log(response.data);

            // For example, you might want to store the token and navigate to the next screen.
            // Replace this with your actual navigation logic.
            navigation.navigate('Home');
        } catch (error) {
            // Handle login error (e.g., display an error message)
            console.error('Login failed:', error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center' }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                {/* ... (your existing UI code) */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                    <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor={COLORS.black}
                            keyboardType="email-address"
                            style={{ width: '100%' }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                    <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{ width: '100%' }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: 'absolute', right: 12 }}>
                            {isPasswordShown ? (
                                <Ionicons name="eye-off" size={24} color={COLORS.black} />
                            ) : (
                                <Ionicons name="eye" size={24} color={COLORS.black} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ... (your existing UI code) */}

                <Button title="Login" filled onPress={loginUser} style={{ marginTop: 18, marginBottom: 4 }} />

                {/* ... (your existing UI code) */}
            </View>
        </SafeAreaView>
    );
};

export default Login;
