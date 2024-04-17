import React, {useEffect, useState} from 'react';
import {Alert, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../../components/Button';
import API from '../../../constants/api';
import axios from "axios";

export default function ClientDetails({route, navigation}) {
    const serverUrl = `${API.clientSingle}/${route.params.paramKey}`;

    const [clientDetails, setClient] = useState(null);

    useEffect(() => {
        const getClient = async () => {
            try {
                const response = await axios.get(serverUrl)
                setClient(response.data)
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch users. Please try again. ' + error.message);
            } finally {
                // If the load exists
                // setLoading(false);
            }
        };

        getClient();
    }, [route.params.paramKey]);

    // Functions to call and send email
    const handleCallPress = () => {
        if (clientDetails && clientDetails.phone) {
            const phoneNumberWithoutSpaces = clientDetails.phone.replace(/\s/g, ''); // Remove spaces from the phone number
            const phoneUrl = `tel:${phoneNumberWithoutSpaces}`;
            Linking.openURL(phoneUrl);
        } else {
            Alert.alert('Error', 'Phone number not available.');
        }
    };

    const handleEmailPress = () => {
        if (clientDetails && clientDetails.email) {
            const emailUrl = `mailto:${clientDetails.email}`;
            Linking.openURL(emailUrl);
        } else {
            Alert.alert('Error', 'Email address not available.');
        }
    };

    const handleDeletePress = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // Navigate to google.com
                        const response = axios.delete(serverUrl)
                        navigation.goBack()
                    },
                },
            ],
            { cancelable: false }
        );
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.imageName}>
                    <Image
                        alt=""
                        resizeMode="cover"
                        source={require('../../../assets/imgs/persons/user.png')}
                        style={styles.cardImg}
                    />
                    <Text style={styles.clientName}>{clientDetails ? clientDetails.firstName : 'Loading...'} {clientDetails ? clientDetails.lastName : 'Loading...'}</Text>
                </View>

                <View style={styles.details}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Button
                            title={
                                <>
                                    <FeatherIcon name="phone" size={24} color="white"/>
                                    {' Call Now'}
                                </>
                            }

                            filled
                            style={{
                                width: '49%',
                            }}
                            onPress={handleCallPress}
                        />
                        <View style={{width: '2%'}}/>
                        <Button
                            title={
                                <>
                                    <FeatherIcon name="mail" size={24}/>
                                    {' Email Now'}
                                </>
                            }
                            filled
                            style={{
                                width: '49%',
                            }}
                            onPress={handleEmailPress}
                        />

                    </View>
                    {renderCard('Email', clientDetails ? clientDetails.email : 'Loading...')}
                    {renderCard('Phone', clientDetails ? clientDetails.phone : 'Loading...')}
                    {renderCard('Address', clientDetails ? clientDetails.address : 'Loading...')}
                    {renderCard('Country', clientDetails ? clientDetails.country : 'Loading...')}
                    {renderCard('Gender', clientDetails ? clientDetails.gender : 'Loading...')}
                    {renderCard('Website', clientDetails ? clientDetails.website : 'Loading...')}
                    {renderCard('More info', clientDetails ? clientDetails.about : 'Loading...')}
                </View>
                <View style={{marginTop: 10, marginBottom: 20}}>
                    <Button
                        title={
                            <>
                                <FeatherIcon name="trash" size={24}/>
                                {' Delete contact'}
                            </>
                        }
                        style={{
                            width: '100%', backgroundColor: '#ff3636', borderColor: '#ff3636'
                        }}
                        filled
                        onPress={handleDeletePress}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const renderCard = (title, content) => (
    <View style={styles.card} key={title}>
        <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{`${title} :`}</Text>
        </View>
        <Text style={styles.cardContent}>{content}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    imageName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImg: {
        width: 200,
        height: 200,
        borderRadius: 200,
    },
    clientName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    details: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
    },
    card: {
        marginVertical: 10,
        // marginBottom: 5
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
    },
    cardContent: {
        // flex: 1,
        // marginLeft: 10,
        fontSize: 17,
        lineHeight: 20,
        fontWeight: '500',
        color: '#616d79',
        marginTop: 3,
    },
});
// <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     <Text onPress={() => alert('This is client details')}>{ route.params.paramKey }</Text>
// </View>