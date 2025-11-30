import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToFavorites, saveTrack } from '../redux/tracksSlice';

const SongCard = ({ imgUrl, title, singer, songUrl, id, onRemove }) => {
    const dispatch = useDispatch();

    const handlePlay = () => {
        if (songUrl) {
            Linking.openURL(songUrl);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => dispatch(addToFavorites({ id, title, singer, imgUrl }))}>
                    <Ionicons name="heart-outline" size={22} color="#FF4D67" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => dispatch(saveTrack({ id, title, singer, imgUrl }))}>
                    <Ionicons name="bookmark-outline" size={22} color="#3A7DFF" />
                </TouchableOpacity>

                {onRemove && (
                    <TouchableOpacity onPress={() => onRemove(id)}>
                        <Ionicons name="close-circle-outline" size={22} color="#999999" />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity style={styles.container} onPress={handlePlay} activeOpacity={0.8}>
                <Image style={styles.image} source={{ uri: imgUrl }} />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.singer}>{singer}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    buttons: {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 10,
        flexDirection: 'row',
        gap: 10,
    },
    container: {
        width: 200,
        height: 189,
        backgroundColor: '#F8F9FE',
        borderRadius: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12,
        padding: 0,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    image: {
        width: '100%',
        height: '65%',
        borderRadius: 8,
        marginBottom: 8,
    },
    textContainer: {
        paddingHorizontal: 8,
        width: '100%',
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
        color: '#1F2024',
        marginBottom: 2,
    },
    singer: {
        fontWeight: '400',
        fontSize: 12,
        color: '#71727A',
        marginBottom: 4,
    },
});

export default SongCard;