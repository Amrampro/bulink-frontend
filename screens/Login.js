import {View, Text, Image, Pressable, TextInput, TouchableOpacity} from 'react-native'
import {useAuth} from "./auth/AuthContext";
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import {Ionicons} from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import API from '../constants/api';
import axios from "axios";

const Login = ({navigation}) => {
    const {user, setAuthenticatedUser} = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        // If userId exists, navigate to 'MainUi'
        if (user) {
            navigation.navigate('MainUi');
        }
    }, [user, navigation]);

    const loginUser = async () => {
        try {
            const response = await axios.post(API.login, {
                username: username,
                password: password,
            });

            // If login is successful, you can handle the response here.
            // console.log(response.data);


            // For example, you might want to store the token and navigate to the next screen.
            // Replace this with your actual navigation logic.
            // If user is correctly signed In, we take the ID
            const userData = response.data;
            console.log(response.data);
            setAuthenticatedUser(userData);
        } catch (error) {
            // console.error(error)
            if (!error.response) {
                setErrorMessage('Network Error. Please check your internet connection')
                // console.error(error.message)
            }

            if (error.response.status === 401) {
                setErrorMessage('Login failed: Username or password incorrect !')
                // console.log('Unauthorized: ', error.message)
            }
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center'}}>
            <View style={{flex: 1, marginHorizontal: 22}}>
                <View style={{marginVertical: 22}}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>
                {errorMessage ? (
                    <View style={{
                        backgroundColor: COLORS.dangerLte,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 7,
                        borderColor: COLORS.danger,

                    }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.danger}}>{errorMessage}</Text>
                    </View>
                ) : ('')}

                <View style={{marginBottom: 12}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Username</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            // keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            // value={email}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            // value={passwordl}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black}/>
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black}/>
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{marginRight: 8}}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remember Me</Text>
                </View>

                <Button
                    title="Login"
                    filled
                    onPress={loginUser}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{fontSize: 14}}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{fontSize: 16, color: COLORS.black}}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login