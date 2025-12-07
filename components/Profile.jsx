import React, {useContext} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { ThemeContext } from "../context/ThemeContext";


export default function Profile() {

    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const primaryTextColor = isDark ? '#E5E5E5' : '#1F2024';
    const secondaryTextColor = isDark ? '#A0A0A0' : '#71727A';
    const dividerColor = isDark ? '#333333' : '#D4D6DD';

    const handlePress = (setting) => {
        console.log(`Setting pressed: ${setting}`);
    };

    const SettingItem = ({ text, isLast = false, onPress }) => (
        <>
            <TouchableOpacity
                style={styles.settingItem}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <Text style={[styles.settingText, {color: primaryTextColor}]}>{text}</Text>
            </TouchableOpacity>
            {!isLast && <View style={[styles.divider, { borderTopColor: dividerColor }]} />}
        </>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileBlock}>
                <Image
                    style={styles.profilImg}
                    source={require('../assets/Profile.png')}
                />
                <Text style={[styles.name, { color: primaryTextColor }]}>
                    Anna Lindemann
                </Text>

                <Text style={[styles.id, { color: secondaryTextColor }]}>
                    @lindemaaaan87
                </Text>
            </View>

            <View style={styles.settingsBlock}>
                <SettingItem text="Notifications" onPress={() => handlePress('Notifications')} />
                <SettingItem text="Appearance" onPress={() => handlePress('Appearance')} />
                <SettingItem text="Language" onPress={() => handlePress('Language')} />
                <SettingItem text="Privacy & Security" onPress={() => handlePress('Privacy & Security')} />
                <SettingItem text="Log Out" onPress={() => handlePress('Log Out')} isLast={true} />
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 9,
        paddingHorizontal: 20
    },

    profileBlock: {
        alignItems: 'center',
        marginBottom: 40
    },

    profilImg:{
        width: 82,
        height: 82,
        borderRadius: 41,
    },
    name:{
        fontWeight: '700',
        fontSize: 18,
        marginTop: 10,
    },
    id:{
        fontWeight: '400',
        fontSize: 14,
    },

    settingsBlock: {
        width: '100%',
        alignItems: "flex-start",
        paddingHorizontal: 12,
    },

    settingItem: {
        width: '100%',
        paddingVertical: 14,
    },
    settingText: {
        fontSize: 16,
    },
    divider: {
        borderTopWidth: StyleSheet.hairlineWidth,
        width: '100%',
        marginHorizontal: 0,
    }
});