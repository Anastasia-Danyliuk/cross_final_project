import React, { useContext, useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Platform, Animated }
    from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToFavorites, saveTrack } from '../redux/tracksSlice';
import { ThemeContext } from "../context/ThemeContext";

const SongCard = ({ imgUrl, title, singer, songUrl, id, onRemove, bgColor: propBgColor }) => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const likeScale = useRef(new Animated.Value(1)).current;
    const saveScale = useRef(new Animated.Value(1)).current;

    const cardBgColor = propBgColor || (isDark ? "#333333" : "#F8F9FE");
    const isDarkBackground = cardBgColor === '#333333';
    const primaryTextColor = isDarkBackground ? '#E5E5E5' : '#1F2024';
    const secondaryTextColor = isDarkBackground ? '#A0A0A0' : '#71727A';
    const cardShadow = isDarkBackground ? styles.darkShadow : styles.lightShadow;

    const handleAnimationPress = useCallback((scaleValue) => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const trackPayload = { id, title, singer, imgUrl };

    const onLike = useCallback(() => {
        handleAnimationPress(likeScale);
        dispatch(addToFavorites(trackPayload));
    }, [dispatch, likeScale, trackPayload]);

    const onSave = useCallback(() => {
        handleAnimationPress(saveScale);
        dispatch(saveTrack(trackPayload));
    }, [dispatch, saveScale, trackPayload]);


    const handlePlay = () => {
        if (songUrl) {
            Linking.openURL(songUrl);
        }
    };

    return (
        <View style={styles.wrapper}>

            <TouchableOpacity
                style={[styles.container, { backgroundColor: cardBgColor }, cardShadow]}
                onPress={handlePlay}
                activeOpacity={0.8}
            >
                <Image
                    style={styles.image}
                    source={{ uri: imgUrl }}
                />

                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: primaryTextColor }]} numberOfLines={2}>{title}</Text>
                    <Text style={[styles.singer, { color: secondaryTextColor }]} numberOfLines={1}>{singer}</Text>

                    <View style={styles.actionButtons}>
                        {/* Кнопка Like з анімацією */}
                        <TouchableOpacity onPress={onLike}>
                            <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                                <Ionicons name="heart-outline" size={20} color="#FF4D67" />
                            </Animated.View>
                        </TouchableOpacity>

                        {/* Кнопка Save з анімацією */}
                        <TouchableOpacity onPress={onSave}>
                            <Animated.View style={{ transform: [{ scale: saveScale }] }}>
                                <Ionicons name="bookmark-outline" size={20} color="#3A7DFF" />
                            </Animated.View>
                        </TouchableOpacity>

                        {onRemove && (
                            <TouchableOpacity onPress={() => onRemove(id)}>
                                <Ionicons name="trash-outline" size={20} color={secondaryTextColor} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 5,
    },

    container: {
        width: '100%',
        borderRadius: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 8,
        padding: 0,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        height: undefined,
        borderRadius: 8,
        marginBottom: 5,
    },
    textContainer: {
        paddingHorizontal: 6,
        paddingBottom: 8,
        width: '100%',
    },
    title: {
        fontWeight: '600',
        fontSize: 13,
        marginBottom: 1,
    },
    singer: {
        fontWeight: '400',
        fontSize: 11,
        marginBottom: 2,
    },
    lightShadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        android: {
            elevation: 2,
        },
    }),
    darkShadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        android: {
            elevation: 0,
        },
    }),
});

export default SongCard;