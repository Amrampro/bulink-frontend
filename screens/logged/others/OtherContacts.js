import React from 'react';
import ContactsView from '../../../components/ContactsView';
import API from '../../../constants/api';
import {useAuth} from "../../auth/AuthContext";

const Others = ({ navigation }) => {
    const { user } = useAuth();
    // const serverUrl = API.othersReadAll_Admin;
    const serverUrl = `${API.othersReadAll}/${user.id}`;

    return <ContactsView navigation={navigation} serverUrl={serverUrl} />;
};

export default Others;