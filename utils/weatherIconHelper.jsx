import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const ICON_SIZE = 50;
const ICON_COLOR = '#3A7DFF';

export function getWeatherIcon(conditionCode) {
    const code = parseInt(conditionCode, 10);
    let iconName;


    if (code === 1000) {
        iconName = 'sunny-outline';
    } else if (code === 1003 || code === 1006 || code === 1009) {
        iconName = 'cloudy-outline';
    } else if (code >= 1180 && code <= 1200 || code >= 1240 && code <= 1246) {
        iconName = 'rainy-outline';
    } else if (code >= 1210 && code <= 1230 || code >= 1255 && code <= 1264) {
        iconName = 'snow-outline';
    } else if (code >= 1087 || code >= 1273 && code <= 1279) {
        iconName = 'thunderstorm-outline';
    } else if (code === 1135 || code === 1147) {
        iconName = 'filter-outline';
    } else {
        iconName = 'warning-outline';
    }

    return (
        <Ionicons
            name={iconName}
            size={ICON_SIZE}
            color={ICON_COLOR}
        />
    );
}