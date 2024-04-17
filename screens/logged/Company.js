import React from 'react';
import ContactsView from "../../components/ContactsView";
import API from "../../constants/api";
import {useAuth} from "../auth/AuthContext";

const Company = ({navigation}) => {
    const { user } = useAuth();
    // const serverUrl = API.companyReadAll_Admin;
    const serverUrl = `${API.companyReadAll}/${user.id}`
    return <ContactsView navigation={navigation} serverUrl={serverUrl}></ContactsView>
}

export default Company;