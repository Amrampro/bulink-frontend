import React from 'react';
import ContactsView from '../../components/ContactsView';
import API from '../../constants/api';
import {useAuth} from "../auth/AuthContext";

const Clients = ({ navigation }) => {
    const { user } = useAuth();
    // const serverUrl = API.clientReadAll_Admin
    const serverUrl = `${API.clientReadAll}/${user.id}`
    // alert(serverUrl)

    return <ContactsView navigation={navigation} serverUrl={serverUrl} />;
};

export default Clients;