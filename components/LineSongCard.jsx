import React, { memo, useCallback, useContext, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Dimensions, Platform, Animated }
    from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToFavorites, saveTrack } from '../redux/tracksSlice';
import { ThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.96;
const CARD_HEIGHT = 50;
const IMAGE_WIDTH = CARD_WIDTH * 0.23;
const BUTTONS_AREA_WIDTH = 95;

const LineSongCard = ({ imgUrl, title, singer, songUrl, id, onRemove, bgColor: propBgColor }) => {

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
    const buttonBgColor = cardBgColor;

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

    const safeId = id !== undefined && id !== null ? String(id) : `tmp_${Math.floor(Math.random() * 100000)}`;
    const trackPayload = { id: safeId, title: title || 'Unknown', singer: singer || 'Unknown', imgUrl: imgUrl || '' };


    const handlePlay = useCallback(() => {
        if (songUrl) {
            Linking.openURL(songUrl);
        }
    }, [songUrl]);

    const onLike = useCallback(() => {
        handleAnimationPress(likeScale);
        dispatch(addToFavorites(trackPayload));
    }, [dispatch, likeScale, trackPayload]);

    const onSave = useCallback(() => {
        handleAnimationPress(saveScale);
        dispatch(saveTrack(trackPayload));
    }, [dispatch, saveScale, trackPayload]);

    const handleRemove = onRemove ? useCallback(() => {
        onRemove(safeId);
    }, [onRemove, safeId]) : null;


    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: cardBgColor },
                cardShadow
            ]}
            onPress={handlePlay}
            activeOpacity={0.8}
        >

            <View style={[styles.buttons, { backgroundColor: buttonBgColor }]}>
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

                {handleRemove && (
                    <TouchableOpacity onPress={handleRemove}>
                        <Ionicons name="trash-outline" size={20} color={secondaryTextColor} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: imgUrl }} />
            </View>

            <View style={styles.textWrapper}>
                <Text style={[styles.singer, { color: primaryTextColor }]} numberOfLines={1}>{singer}</Text>
                <Text style={[styles.title, { color: secondaryTextColor }]} numberOfLines={1}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttons: {
        position: 'absolute',
        right: 8,
        top: 0,
        bottom: 0,
        justifyContent: 'center',

        zIndex: 10,
        flexDirection: 'row',
        gap: 12,
        paddingLeft: 12,
    },
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
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
        justifyContent: 'center',
        paddingRight: BUTTONS_AREA_WIDTH,
    },
    singer: {
        fontSize: 14,
        fontWeight: '700',
    },
    title: {
        fontSize: 12,
    },
    lightShadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        android: { elevation: 3 },
    }),
    darkShadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        android: { elevation: 0 },
    }),
});

export default memo(LineSongCard);