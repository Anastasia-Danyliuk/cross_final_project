import React, { memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToFavorites, saveTrack } from '../redux/tracksSlice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.96;
const CARD_HEIGHT = 50;
const IMAGE_WIDTH = CARD_WIDTH * 0.23;

const LineSongCard = ({ imgUrl, title, singer, songUrl, id, onRemove }) => {

    const dispatch = useDispatch();

    const safeId = id !== undefined && id !== null ? String(id) : `tmp_${Math.floor(Math.random() * 100000)}`;

    const handlePlay = useCallback(() => {
        if (songUrl) {
            Linking.openURL(songUrl);
        }
    }, [songUrl]);

    const onLike = useCallback(() => {
        const payload = { id: safeId, title: title || 'Unknown', singer: singer || 'Unknown', imgUrl: imgUrl || '' };
        console.log('Dispatching addToFavorites with payload:', payload);
        dispatch(addToFavorites(payload));
    }, [safeId, title, singer, imgUrl, dispatch]);

    const onSave = useCallback(() => {
        const payload = { id: safeId, title: title || 'Unknown', singer: singer || 'Unknown', imgUrl: imgUrl || '' };
        console.log('Dispatching saveTrack with payload:', payload);
        dispatch(saveTrack(payload));
    }, [safeId, title, singer, imgUrl, dispatch]);

    const handleRemove = onRemove ? useCallback(() => {
        onRemove(safeId);
    }, [onRemove, safeId]) : null;

    return (
        <View style={styles.wrapper}>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={onLike}>
                    <Ionicons name="heart-outline" size={20} color="#FF4D67" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onSave}>
                    <Ionicons name="bookmark-outline" size={20} color="#3A7DFF" />
                </TouchableOpacity>

                {onRemove && (
                    <TouchableOpacity onPress={handleRemove}>
                        <Ionicons name="close-circle-outline" size={20} color="#999999" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.container} onPress={handlePlay} activeOpacity={0.8}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: imgUrl }} />
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.singer}>{singer}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    buttons: {
        position: 'absolute',
        right: 8,
        top: 6,
        zIndex: 10,
        flexDirection: 'row',
        gap: 12,
    },
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#F8F9FE',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: { elevation: 3 },
        }),
    },
    imageWrapper: {
        width: IMAGE_WIDTH,
        height: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    singer: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2024'
    },
    title: {
        fontSize: 12,
        color: '#71727A'
    },
});

export default memo(LineSongCard);