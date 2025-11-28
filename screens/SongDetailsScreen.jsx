import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function SongDetailsScreen({ route }) {
    const { id } = route.params;
    const [song, setSong] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.deezer.com/track/${id}`)
            .then((response) => setSong(response.data))
            .catch(console.log);
    }, []);

    if (!song) {
        return <ActivityIndicator size="large" style={{ marginTop: 60 }} />;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: song.album.cover_big }} style={styles.cover} />
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist.name}</Text>
            <Text style={styles.info}>Duration: {song.duration} sec</Text>
            <Text style={styles.info}>Rank: {song.rank}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
    },
    cover: {
        borderRadius: 12,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: "700"
    },
    artist: {
        fontSize: 18,
        marginVertical: 10 },
    info: {
        fontSize: 14,
        color: "#777"
    },
});
