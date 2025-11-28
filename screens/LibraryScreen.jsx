import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import { getDeezerTracks } from "../api/api";
import Switcher from "../components/Switcher";
import LineSongCard from "../components/LineSongCard";
import SongCard from "../components/SongCard";

export default function LibraryScreen() {

    const [activeTab, setActiveTab] = useState("Saved");
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTracks() {
            try {
                const data = await getDeezerTracks();
                setTracks(data);
            } catch (e) {
                setError("Loading error");
            } finally {
                setLoading(false);
            }
        }

        loadTracks();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
            </View>
        );
    }

    let content = null;

    if (activeTab === "Saved") {
        content = (
            <FlatList
                data={tracks.slice(0, 10)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LineSongCard
                        title={item.title}
                        singer={item.artist.name}
                        imgUrl={item.album.cover}
                        songUrl={item.link}
                    />
                )}
                contentContainerStyle={styles.savedList}
            />
        );
    }

    if (activeTab === "Liked") {
        content = (
            <FlatList
                data={tracks.slice(10, 20)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LineSongCard
                        title={item.title}
                        singer={item.artist.name}
                        imgUrl={item.album.cover}
                        songUrl={item.link}
                    />
                )}
                contentContainerStyle={styles.likedList}
            />
        );
    }

    if (activeTab === "Albums") {
        content = (
            <FlatList
                horizontal
                data={tracks.slice(0, 8)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.albumItem}>
                        <SongCard
                            title={item.title}
                            singer={item.artist.name}
                            imgUrl={item.album.cover_big}
                            songUrl={item.link}
                        />
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.albumList}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Switcher activeTab={activeTab} setActiveTab={setActiveTab} />
            <View style={styles.contentWrapper}>{content}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    contentWrapper: {
        marginTop: 30,
        flex: 1,
    },

    savedList: {
        gap: 20,
    },

    likedList: {
        gap: 20,
    },

    albumList: {
        paddingRight: 14,
    },

    albumItem: {
        marginRight: 14,
    },
});
