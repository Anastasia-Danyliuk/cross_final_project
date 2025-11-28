import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigation';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SongDetailsScreen from '../screens/SongDetailsScreen';

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: true, title: 'Search' }}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: true, title: 'Profile' }}
            />
            <Stack.Screen
                name="Details"
                component={SongDetailsScreen} />
        </Stack.Navigator>
    );
}
