import * as React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "../../constants/colors";

// Screens
import EmployeeContacts from "./others/EmployeeContacts"
import OtherContacts from "./others/OtherContacts"
import {Ionicons} from "@expo/vector-icons";

// Screens name
const employee = 'Employees';
const other = 'Other';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function EmployeeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={employee} component={EmployeeContacts} />
            {/* Add more screens related to Clients if needed */}
        </Stack.Navigator>
    );
}

function OtherStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={other} component={OtherContacts} />
            {/* Add more screens related to Company if needed */}
        </Stack.Navigator>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName={employee}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let iconSize = 24;
                    let rn = route.name;

                    if (rn === employee) {
                        iconName = focused ? 'people-circle' : 'people-circle-outline'
                    } else if (rn === other) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    }

                    return <Ionicons name={iconName} size={iconSize} color={color}/>
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "grey",
                tabBarLabelStyle: {paddingBottom: 10, fontSize: 12},
                tabBarStyle: {padding: 0, height: 70},
                tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
            })}
        >
            <Tab.Screen name={employee} component={EmployeeContacts} />
            <Tab.Screen name={other} component={OtherContacts} />
        </Tab.Navigator>
    );
}

export default function Others() {
    return (
        <TabNavigator />
    );
}
