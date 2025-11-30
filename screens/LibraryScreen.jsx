import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, LayoutAnimation, Platform, UIManager} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getDeezerTracks } from "../api/api";
import Switcher from "../components/Switcher";
import LineSongCard from "../components/LineSongCard";
import SongCard from "../components/SongCard";
import { ThemeContext } from "../context/ThemeContext";
import { removeFromFavorites, removeFromSaved } from "../redux/tracksSlice";


if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const mapTrack = (track, index) => {
    const id = track && track.id ? String(track.id) : "tmp_" + index;
    const title = track && (track.title || track.name) ? (track.title || track.name) : "Unknown";
    const singer = track && (track.singer || (track.artist && track.artist.name)) ? (track.singer || track.artist.name) : "Unknown";
    const imgUrl = track && (track.imgUrl || (track.album && track.album.cover_big)) ? (track.imgUrl || track.album.cover_big) : "";
    const songUrl = track && (track.songUrl || track.link) ? (track.songUrl || track.link) : "";

    return {id, title, singer, imgUrl, songUrl};
};


export function LibraryScreen() {

    const [activeTab, setActiveTab] = useState("Saved");
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {theme} = useContext(ThemeContext);
    const isDark = theme === "dark";

    const dispatch = useDispatch();

    const favorites = useSelector(state => (state.tracks && state.tracks.favorites) ? state.tracks.favorites : []);
    const saved = useSelector(state => (state.tracks && state.tracks.saved) ? state.tracks.saved : []);

    useEffect(() => {
        async function load() {
            try {
                const data = await getDeezerTracks();
                if (Array.isArray(data)) {
                    setTracks(data);
                } else {
                    setTracks([]);
                }
            } catch (e) {
                setError("Loading error");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const handleRemoveFromSaved = useCallback((trackId) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        dispatch(removeFromSaved(trackId));
    }, [dispatch]);

    const handleRemoveFromFavorites = useCallback((trackId) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        dispatch(removeFromFavorites(trackId));
    }, [dispatch]);

    const renderContent = () => {
        let data = [];
        let emptyMessage = "Any songs";
        let onRemoveHandler = null;

        if (activeTab === "Saved") {
            data = Array.isArray(saved) ? saved.map(mapTrack) : [];
            emptyMessage = "Any saved songs";
            onRemoveHandler = handleRemoveFromSaved;
        } else if (activeTab === "Liked") {
            data = Array.isArray(favorites) ? favorites.map(mapTrack) : [];
            emptyMessage = "Any liked songs";
            onRemoveHandler = handleRemoveFromFavorites;
        } else if (activeTab === "Albums") {
            data = Array.isArray(tracks) ? tracks.slice(0, 8).map(mapTrack) : [];
            emptyMessage = "Any albums";
        }

        if (!Array.isArray(data) || data.length === 0) {
            return (
                <View style={styles.center}>
                    <Text style={{ color: isDark ? "#ffffff" : "#000000" }}>{emptyMessage}</Text>
                </View>
            );
        }

        return (
            <FlatList
                horizontal={activeTab === "Albums"}
                data={data}
                keyExtractor={(item, index) => (item.id || String(index))}
                ItemSeparatorComponent={() => <View style={{width: 15}}/>}
                renderItem={({item}) => {
                    if (activeTab === "Albums") {
                        return <SongCard id={item.id} title={item.title} singer={item.singer} imgUrl={item.imgUrl}
                                         songUrl={item.songUrl}/>;
                    } else {
                        return (
                            <LineSongCard
                                id={item.id}
                                title={item.title}
                                singer={item.singer}
                                imgUrl={item.imgUrl}
                                songUrl={item.songUrl}
                                onRemove={onRemoveHandler}
                            />
                        );
                    }
                }}
            />
        );
    };


    if (loading) {
        return (
            <View style={[styles.center, {backgroundColor: isDark ? "#444444" : "#fff"}]}>
                <ActivityIndicator size="large" color={isDark ? "#ffffff" : "#000000"}/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.center, {backgroundColor: isDark ? "#444444" : "#fff"}]}>
                <Text style={{ color: isDark ? "#ffffff" : "#000000" }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, {backgroundColor: isDark ? "#444444" : "#fff"}]}>
            <Switcher activeTab={activeTab} setActiveTab={setActiveTab}/>
            <View style={styles.contentWrapper}>
                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    contentWrapper: {
        flex: 1,
        marginTop: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});