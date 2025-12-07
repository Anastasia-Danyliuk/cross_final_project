import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Profile from '../components/Profile';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
                <Text style={{ color: '#444444' }}>Error</Text>
            </SafeAreaView>
        );
    }

    const { theme, handleThemeChange } = ctx;

    const screenBgColor = theme === 'light' ? '#ffffff' : '#222222';
    const textColor = theme === 'light' ? '#1F2024' : '#E5E5E5';
    const secondaryTextColor = theme === 'light' ? '#71727A' : '#A0A0A0';
    const switchBgColor = theme === 'light' ? '#F0F0F0' : '#333333';
    const accentColor = "#3A7DFF";

    const onPressChange = () => {
        if (typeof handleThemeChange === 'function') handleThemeChange();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: screenBgColor }]}>
            <Profile />

            <View style={styles.switchBlock}>
                <Text style={[styles.switchTitle, { color: secondaryTextColor }]}>Appearance</Text>

                <View style={[styles.themeSwitchContainer, { backgroundColor: switchBgColor }]}>
                    <Text style={[styles.themeLabel, { color: textColor }]}>Theme</Text>

                    <TouchableOpacity
                        style={[styles.themeButton, { backgroundColor: theme === 'dark' ? accentColor : 'transparent' }]}
                        onPress={onPressChange}
                    >
                        <Ionicons
                            name={theme === 'dark' ? "moon" : "sunny"}
                            size={20}
                            color={theme === 'dark' ? '#fff' : textColor}
                        />
                        <Text style={[styles.themeText, { color: theme === 'dark' ? '#fff' : textColor }]}>
                            {theme === 'dark' ? "Dark" : "Light"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    switchBlock: {
        marginTop: 20,
        paddingHorizontal: 12,
    },
    switchTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    themeSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        height: 50,
    },
    themeLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    themeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
        minWidth: 90,
        justifyContent: 'space-around',
    },
    themeText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    }
});