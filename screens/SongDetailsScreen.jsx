import React, {useContext, useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SongDetailsScreen({ route }) {
    const { id } = route.params;
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    useEffect(() => {
        async function fetchSongDetails() {
            setLoading(true);
            try {
                const response = await fetch(`https://api.deezer.com/track/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSong(data);
            } catch (error) {
                console.error("Deezer API error in details screen:", error);
                setSong(null);
            } finally {
                setLoading(false);
            }
        }

        fetchSongDetails();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color={isDark ? "#ffffff" : "#000000"} style={styles.loading} />;
    }

    if (!song) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? "#444444" : "#fff" }]}>
                <Text style={{ color: isDark ? "#fff" : "#000" }}>Failed to load song details.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#444444" : "#fff" }]}>
            <Image source={{ uri: song.album.cover_big }} style={styles.cover} />
            <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{song.title}</Text>
            <Text style={[styles.artist, { color: isDark ? "#ccc" : "#111" }]}>{song.artist.name}</Text>
            <Text style={[styles.info, { color: isDark ? "#ccc" : "#555" }]}>Duration: {song.duration} sec</Text>
            <Text style={[styles.info, { color: isDark ? "#ccc" : "#555" }]}>Rank: {song.rank}</Text>
        </View> );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    cover: {
        width: 300,
        height: 300,
        borderRadius: 12,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: "700"
    },
    artist: {
        fontSize: 18,
        marginVertical: 10
    },
    info: {
        fontSize: 14,
        color: "#777"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    }
});