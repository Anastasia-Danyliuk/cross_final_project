import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard";
import LineSongCard from "../components/LineSongCard";


export default function WeatherScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const {
        weatherData,
        musicRecommendation,
        isLoading,
        error
    } = useContext(WeatherContext);

    // 💡 Уніфіковані кольори
    const screenBgColor = isDark ? "#222222" : "#fff";
    const mainTextColor = isDark ? "#E5E5E5" : "#000";
    const accentColor = "#3A7DFF";


    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: screenBgColor }]}>
                <ActivityIndicator size="large" color={isDark ? mainTextColor : accentColor} />
            </View>
        );
    }


    if (error) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: screenBgColor }]}>
                <Text style={[styles.errorText, { color: mainTextColor }]}>Failed to load: {error}</Text>
            </View>
        );
    }
    return (
        <ScrollView style={[styles.fullScreen, { backgroundColor: screenBgColor }]}>
            <View style={styles.content}>
                {weatherData && <WeatherCard />}
                {musicRecommendation && Array.isArray(musicRecommendation) && (
                    <Text style={[styles.recommendationTitle, {color: mainTextColor}]}>Recommended Music</Text>
                )}
                {musicRecommendation && Array.isArray(musicRecommendation) && musicRecommendation.map((track) => (

                    <LineSongCard

                        key={track.id}
                        id={track.id}
                        title={track.title}
                        singer={track.singer}
                        imgUrl={track.imgUrl}
                        songUrl={track.songUrl}
                    />
                ))}
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({

    fullScreen: {
        flex: 1,
    },

    content: {
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 12,

    },

    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,

    },
    recommendationTitle: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 10,
    }

});