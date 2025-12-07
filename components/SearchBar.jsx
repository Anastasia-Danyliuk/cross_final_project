import React, { useContext } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const SearchBar = ({ onPress, disabledInput, style, containerStyle, onSearch, ...props }) => {
    const [text, onChangeText] = React.useState('');
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const searchBgColor = isDark ? '#333333' : '#F8F9FE';
    const searchTextColor = isDark ? '#E5E5E5' : '#1F2024';
    const searchPlaceholderColor = isDark ? '#A0A0A0' : '#71727A';


    const handleSearch = () => {
        if (onSearch) {
            onSearch(text);
        }
        Keyboard.dismiss();
    };

    const Content = (
        <View style={[styles.container, containerStyle, style, { backgroundColor: searchBgColor }]}>
            <TextInput
                style={[styles.input, { color: searchTextColor }]}
                editable={!disabledInput}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search"
                placeholderTextColor={searchPlaceholderColor}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />

            <TouchableOpacity onPress={handleSearch} activeOpacity={0.7}>
                <Ionicons name="search" size={16} color="#3A7DFF" />
            </TouchableOpacity>

        </View>
    );

    return onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {Content}
        </TouchableOpacity>
    ) : (
        Content
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: 343,
        height: 44,
        borderRadius: 24,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
    }
});

export default SearchBar;