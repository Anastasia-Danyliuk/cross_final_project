import React, {useContext, useState} from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import SearchBar from '../components/SearchBar';
import { ThemeContext } from "../context/ThemeContext";
import LineSongCard from '../components/LineSongCard';
import { searchDeezerTracks } from '../api/searchSongs';

export default function SearchScreen({ navigation }) {

    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const screenBgColor = isDark ? "#222222" : "#fff";
    const mainTextColor = isDark ? '#E5E5E5' : '#1F2024';
    const accentColor = "#3A7DFF";

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const results = await searchDeezerTracks(query);
            setSearchResults(results);

            if (results.length === 0) {
                setError(`No results: "${query}"`);
            }

        } catch (err) {
            console.error("Failed search:", err);
            setError("Failed to search. Check internet connection");
        } finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: screenBgColor
        },
        searchBar: {
            marginHorizontal: 16,
            marginTop: 15,
            marginBottom: 5,
        },
        centerContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoText: {
            color: mainTextColor,
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
        }
    });

    const renderInfoText = () => {
        if (error) {
            return <Text style={[styles.infoText, { color: 'red' }]}>{error}</Text>;
        }
        if (searchResults.length === 0) {
            return <Text style={styles.infoText}>Start typing to search for songs.</Text>;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <SearchBar
                style={styles.searchBar}
                disabledInput={false}
                onSearch={handleSearch}
            />

            {loading && (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={isDark ? mainTextColor : accentColor} />
                </View>
            )}

            {!loading && (
                <ScrollView contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 }}>
                    {searchResults.length > 0 ? (
                        searchResults.map((track) => (
                            <LineSongCard
                                key={track.id}
                                id={track.id}
                                title={track.title}
                                singer={track.singer}
                                imgUrl={track.imgUrl}
                                songUrl={track.songUrl}
                            />
                        ))
                    ) : (
                        <View style={[styles.centerContent, {paddingHorizontal: 30}]}>
                            {renderInfoText()}
                        </View>
                    )}
                </ScrollView>
            )}

        </View>
    );
}