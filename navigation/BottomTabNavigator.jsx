import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from "../screens/MainScreen";
import {LibraryScreen} from "../screens/LibraryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const icons = {
                        Home: 'home',
                        Library: 'book-outline',
                        Profile: 'person-outline',
                    };
                    return <Ionicons name={icons[route.name]} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'grey',
                headerTitleAlign: 'center',
            })}
        >

            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{ headerShown: true }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Settings", headerShown: true }}
            />

        </Tab.Navigator>
    );
}
