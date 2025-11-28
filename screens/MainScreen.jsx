import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import LineSongCard from '../components/LineSongCard';

import { getDeezerTracks } from "../api/api";

export default function MainScreen({ navigation }) {

    const [perfect, setPerfect] = useState([]);
    const [repeat, setRepeat] = useState([]);
    const [trend, setTrend] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const tracks = await getDeezerTracks();

                setPerfect(tracks.slice(0, 5));
                setRepeat(tracks.slice(5, 15));
                setTrend(tracks.slice(15, 25));

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
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }
    if (error) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                style={styles.screen}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                overScrollMode="never"
                bounces={false}
            >


            <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.drawer}
                        onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../assets/MenuIcon.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <SearchBar
                            disabledInput={true}
                            onPress={() => navigation.navigate('Search')}
                        />
                    </View>
                </View>

                <Text style={styles.section}>Perfect for you</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                    {perfect.map(item => (
                        <View key={item.id} style={styles.card}>
                            <SongCard
                                title={item.title}
                                singer={item.artist.name}
                                imgUrl={item.album.cover}
                                songUrl={item.link}
                            />
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.section}>On Repeat</Text>
                <View style={styles.cardLine}>
                    {repeat.map(item => (
                        <LineSongCard
                            key={item.id}
                            title={item.title}
                            singer={item.artist.name}
                            imgUrl={item.album.cover}
                            songUrl={item.link}
                        />
                    ))}
                </View>

                <Text style={styles.section}>On Trend</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                    {perfect.map(item => (
                        <View key={item.id} style={styles.card}>
                            <SongCard
                                title={item.title}
                                singer={item.artist.name}
                                imgUrl={item.album.cover}
                                songUrl={item.link}
                            />
                        </View>
                    ))}
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    screen: {
        paddingTop: 50,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        paddingLeft: 16,
    },
    card: {
        marginRight: 12,
    },
    cardLine: {
        marginLeft: 12,
    },
    section: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 14,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingTop: 24,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
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
    }
});
