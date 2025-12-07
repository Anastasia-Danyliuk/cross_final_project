import React, {useContext, useEffect, useState} from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from "react-native";
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import LineSongCard from '../components/LineSongCard';
import { ThemeContext } from "../context/ThemeContext";
import { getDeezerTracks } from "../api/api";
import {Ionicons} from "@expo/vector-icons";

const SMALL_CARD_WIDTH = 120;

export default function MainScreen({ navigation }) {

    const [perfect, setPerfect] = useState([]);
    const [repeat, setRepeat] = useState([]);
    const [trend, setTrend] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const screenBgColor = isDark ? "#222222" : "#fff";
    const mainTextColor = isDark ? "#E5E5E5" : "#000";
    const subTextColor = isDark ? "#A0A0A0" : "#777777";
    const accentColor = "#3A7DFF";


    useEffect(() => {
        async function loadData() {
            try {
                const tracks = await getDeezerTracks();
                const total = tracks.length;
                const COUNT = 4;

                setPerfect(tracks.slice(0, COUNT));

                const repeatEnd = Math.min(total, COUNT * 2);
                setRepeat(tracks.slice(COUNT, repeatEnd));

                const trendStart = COUNT * 2;
                const trendEnd = COUNT * 3;

                let trendData = [];

                if (total > trendStart) {
                    trendData = tracks.slice(trendStart, trendEnd);
                } else if (total > COUNT) {
                    trendData = tracks.slice(COUNT, total);
                } else {
                    trendData = tracks.slice(0, total);
                }

                setTrend(trendData);

            } catch (e) {
                setError("Loading Error");
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={[styles.center, { backgroundColor: screenBgColor }]}>
                <ActivityIndicator size="large" color={isDark ? mainTextColor : accentColor}/>
            </SafeAreaView>
        );
    }
    if (error) {
        return (
            <SafeAreaView style={[styles.center, { backgroundColor: screenBgColor }]}>
                <Text style={{color: mainTextColor}}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: screenBgColor }]}>
            <ScrollView
                style={styles.screen}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                overScrollMode="never"
                bounces={false}
            >
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.drawer}
                        onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color={accentColor} />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <SearchBar
                            disabledInput={true}
                            onPress={() => navigation.navigate('Search')}
                        />
                    </View>
                </View>

                <Text style={[styles.section, { color: mainTextColor }]}>Recommended for you</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalContainer}
                >
                    {perfect.map(item => (
                        <View key={item.id} style={styles.card}>
                            <SongCard
                                id={item.id}
                                title={item.title}
                                singer={item.artist.name}
                                imgUrl={item.album.cover}
                                songUrl={item.link}
                            />
                        </View>
                    ))}
                </ScrollView>

                <Text style={[styles.section, { color: mainTextColor }]}>On Repeat</Text>
                <View style={styles.cardLine}>
                    {repeat.map(item => (
                        <LineSongCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            singer={item.artist.name}
                            imgUrl={item.album.cover}
                            songUrl={item.link}
                        />
                    ))}
                </View>

                <Text style={[styles.section, { color: mainTextColor }]}>On Trend</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalContainer}
                >
                    {trend.length > 0 ? (
                        trend.map(item => (
                            <View key={item.id} style={styles.card}>
                                <SongCard
                                    id={item.id}
                                    title={item.title}
                                    singer={item.artist.name}
                                    imgUrl={item.album.cover}
                                    songUrl={item.link}
                                />
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyListMessage}>
                            <Text style={{color: subTextColor}}>No tracks.</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={{height: 40}}/>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    screen: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    horizontalContainer: {
        flexDirection: "row",
        paddingLeft: 16,
    },
    card: {
        width: SMALL_CARD_WIDTH,
        marginRight: 12,
    },
    cardLine: {
        marginLeft: 12,
    },
    section: {
        fontWeight: '700',
        fontSize: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingTop: 24,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        width: "100%",
        overflow: "hidden",
    },
    searchBar: {
        marginLeft: 16,
        flex: 1,
    },
    drawer: {
        width: 24,
        paddingLeft: 5,
    },
    emptyListMessage: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    }
});