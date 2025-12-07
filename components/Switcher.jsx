import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ThemeContext } from "../context/ThemeContext";

const Switcher = ({ activeTab, setActiveTab }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const switchBgColor = isDark ? '#333333' : '#F8F9FE';
    const inactiveTextColor = isDark ? '#A0A0A0' : '#71727A';
    const activeBgColor = isDark ? '#555555' : '#B4DBFF';
    const activeTextColor = isDark ? '#E5E5E5' : '#1F2024';

    return (
        <View style={[styles.container, { backgroundColor: switchBgColor }]}>
            <Pressable
                style={[styles.tab, activeTab === 'Albums' && [styles.activeTab, { backgroundColor: activeBgColor }]]}
                onPress={() => setActiveTab('Albums')}
            >
                <Text style={[styles.tabText, { color: inactiveTextColor }, activeTab === 'Albums' && [styles.activeTabText, { color: activeTextColor }]]}>
                    Albums
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tab, activeTab === 'Liked' && [styles.activeTab, { backgroundColor: activeBgColor }]]}
                onPress={() => setActiveTab('Liked')}
            >
                <Text style={[styles.tabText, { color: inactiveTextColor }, activeTab === 'Liked' && [styles.activeTabText, { color: activeTextColor }]]}>
                    Liked
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tab, activeTab === 'Saved' && [styles.activeTab, { backgroundColor: activeBgColor }]]}
                onPress={() => setActiveTab('Saved')}
            >
                <Text style={[styles.tabText, { color: inactiveTextColor }, activeTab === 'Saved' && [styles.activeTabText, { color: activeTextColor }]]}>
                    Saved
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 16,
        width: '100%',
        height: 39,
    },
    tab: {
        flex: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    activeTab: {
    },
    tabText: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 12,
    },
    activeTabText: {
        fontWeight: '700',
    },
});

export default Switcher;