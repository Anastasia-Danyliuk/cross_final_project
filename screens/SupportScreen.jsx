import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from "../context/ThemeContext";


export default function SupportScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const mainColor = isDark ? "#fff" : "#1F2024";
    const subTextColor = isDark ? "#A0A0A0" : "#666";
    const accentColor = "#3A7DFF"; // Primary app accent color
    const cardBgColor = isDark ? "#333333" : "#F0F0F0";

    const handleEmail = () => {
        Linking.openURL('mailto:support@appname.com');
    };

    const handleCall = () => {
        Linking.openURL('tel:+380-50-123-4567');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <Ionicons name="arrow-back" size={24} color={mainColor}/>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={[styles.title, { color: mainColor }]}>Support & Help</Text>
                <Text style={[styles.subtitle, { color: subTextColor }]}>
                    Get in touch with us if you experience any issues or have feedback.
                </Text>
            </View>

            <View style={styles.contactContainer}>

                <TouchableOpacity
                    style={[styles.contactCard, { backgroundColor: cardBgColor }]}
                    onPress={handleEmail}
                >
                    <Ionicons name="mail-outline" size={24} color={accentColor} />
                    <View style={styles.contactInfo}>
                        <Text style={[styles.contactTitle, { color: mainColor }]}>Send an Email</Text>
                        <Text style={[styles.contactValue, { color: subTextColor }]}>support@appname.com</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={20} color={subTextColor} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 5,
        marginBottom: 20,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
    },
    contactContainer: {
        gap: 10,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 15,
    },
    contactTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    contactValue: {
        fontSize: 13,
        marginTop: 2,
    },
});