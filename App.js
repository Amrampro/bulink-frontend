import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MainContainer from "./screens/MainContainer";
import {Login, Signup, Welcome} from "./screens";
import ClientDetails from "./screens/logged/clients/ClientDetails";
import ContactsAdd from "./screens/logged/clients/ContactsAdd";
import EditProfile from "./screens/logged/profile/edit_profile";
import MyCompanies from "./screens/logged/companies/MyCompanies";
import EditMyCompany from "./screens/logged/companies/EditMyCompany";
import GenerateReport from "./screens/logged/companies/GenerateReport";
import {AuthProvider} from "./screens/auth/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
       <AuthProvider>
           <NavigationContainer>
               <Stack.Navigator
                   initialRouteName="Welcome">
                   {/*--------------- Welcome screen ----------------*/}
                   <Stack.Screen
                       name="Welcome"
                       component={Welcome}
                       options={{
                           headerShown: false
                       }}
                   />
                   <Stack.Screen
                       name="Login"
                       component={Login}
                       options={{
                           headerShown: false
                       }}
                   />
                   <Stack.Screen
                       name="Signup"
                       component={Signup}
                       options={{
                           headerShown: false
                       }}
                   />

                   {/*---------------- Main UI ------------------*/}
                   <Stack.Screen
                       name="MainUi"
                       component={MainContainer}
                       options={{headerShown: false}} // Hide the header for the tabs
                   />
                   {/*-----------CLIENTS----------------------*/}
                   <Stack.Screen
                       name="ClientDetails"
                       component={ClientDetails}
                       options={{
                           // headerShown: false,
                           headerTitle: "Client Details"
                       }}
                   />
                   <Stack.Screen
                       name="ContactAdd"
                       component={ContactsAdd}
                       options={{
                           headerTitle: "New client"
                       }}
                   />
                   <Stack.Screen
                   name="EditProfile"
                   component={EditProfile}
                   options={{
                       headerTitle: "Edit Profile"
                   }}
                   />
                   {/*--------------------LOGGED USER COMPANIES--------------------------*/}
                   <Stack.Screen
                       name="MyCompanies"
                       component={MyCompanies}
                       options={{
                           headerTitle: "My Companies"
                       }}
                   />
                   <Stack.Screen
                       name="EditMyCompany"
                       component={EditMyCompany}
                       options={{
                           headerTitle: "View/Edit my company"
                       }}
                   />
                   <Stack.Screen
                       name="GenerateReport"
                       component={GenerateReport}
                       options={{
                           headerTitle: "Generate the report of a company"
                       }}
                   />
               </Stack.Navigator>
           </NavigationContainer>
       </AuthProvider>
    )
}