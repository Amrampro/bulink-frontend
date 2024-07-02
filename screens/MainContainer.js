import * as React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../constants/colors";
import {Platform as Plateform} from "expo-modules-core/src";


// Screens
import Clients from "./logged/Clients";
import Company from "./logged/Company";
import Others from "./logged/Others";
import Reminder from "./logged/Reminder";
import Settings from "./logged/Settings";
import {StyleSheet} from "react-native";

// Screens name
const clientsName = 'Clients';
const companyName = 'Company';
const othersName = 'Others';
const reminderName = 'Reminder';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator

            initialRouteName={clientsName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === clientsName) {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (rn === companyName) {
                        iconName = focused ? 'business' : 'business-outline'
                    } else if (rn === othersName) {
                        iconName = focused ? 'people' : 'people-outline'
                    } else if (rn === reminderName) {
                        iconName = focused ? 'calendar' : 'calendar-outline'
                    } else if (rn === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "grey",
                tabBarLabelStyle: {
                    paddingBottom: Plateform.OS === "ios" ? 0 : 10,
                    fontSize: 12},
                tabBarStyle: {
                    // backgroundColor: COLORS.grey,
                    padding: Plateform.OS === "ios" ? 0 : 0,
                    height: Plateform.OS === "ios" ? 90 : 70
                },
            })}
        >
            <Tab.Screen name={clientsName} component={Clients}/>
            <Tab.Screen name={companyName} component={Company}/>
            <Tab.Screen name={othersName} component={Others}/>
            <Tab.Screen name={reminderName} component={Reminder}/>
            <Tab.Screen name={settingsName} component={Settings}/>

        </Tab.Navigator>
    )
}

export default function MainContainer(){
    return (
        <TabNavigator/>
    );
}