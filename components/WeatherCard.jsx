import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { WeatherContext } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherIconHelper';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.96;

const WeatherCard = () => {

    const { weatherData } = useContext(WeatherContext);
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const cardBgColor = isDark ? "#333333" : "#F8F9FE";
    const primaryTextColor = isDark ? '#E5E5E5' : '#1F2024';
    const errorColor = isDark ? '#FF6B6B' : 'red';

    if (!weatherData) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: cardBgColor }, isDark ? styles.darkShadow : styles.lightShadow]}>
                <Text style={[styles.errorText, { color: errorColor }]}>No data</Text>
            </View>
        );
    }

    const {
        locationName,
        temp_c,
        conditionCode
    } = weatherData;


    const temperature = temp_c;
    const unit = 'C';

    const WeatherIconComponent = getWeatherIcon(conditionCode, isDark);

    return (
        <View style={[styles.container, { backgroundColor: cardBgColor }, isDark ? styles.darkShadow : styles.lightShadow]}>
            <Text style={[styles.location, { color: primaryTextColor }]}>{locationName}</Text>
            <Text style={styles.temp}>
                {Math.round(temperature)}°{unit}
            </Text>

            <View style={styles.imageContainer}>
                {WeatherIconComponent}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        margin: 10,
        borderRadius: 16,
        marginVertical: 10,
        alignItems: 'center',
        paddingVertical: 20,
    },
    centerContent: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginVertical: 5,
    },
    temp: {
        fontSize: 50,
        fontWeight: '300',
        color: '#3A7DFF',
    },
    errorText: {
        fontSize: 16,
    },
    lightShadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        android: { elevation: 3 },
    }),
    darkShadow: Platform.select({
        ios: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        android: { elevation: 0 },
    }),
});

export default WeatherCard;