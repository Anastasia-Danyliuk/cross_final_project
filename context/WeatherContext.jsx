import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getCurrentWeather, getMusicRecommendation } from '../api/weatherApi';

export const WeatherContext = createContext();

const initialContextState = {
    weatherData: null,
    musicRecommendation: [],
    isLoading: false,
    error: null,
};

export function WeatherProvider({ children }) {
    const [state, setState] = useState(initialContextState);

    const loadWeatherAndRecommendations = useCallback(async (location = 'Kyiv') => {
        // 1. Початок завантаження
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const weather = await getCurrentWeather(location);

            const recommendations = getMusicRecommendation(weather.conditionCode, weather.temp_c);

            setState({
                weatherData: weather,
                musicRecommendation: recommendations,
                isLoading: false,
                error: null
            });

        } catch (error) {
            console.error("Failed to load data", error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || "Failed to load"
            }));
        }
    }, []);

    useEffect(() => {
        loadWeatherAndRecommendations('Kyiv');
    }, [loadWeatherAndRecommendations]);

    const contextValue = {
        weatherData: state.weatherData,
        musicRecommendation: state.musicRecommendation,
        isLoading: state.isLoading,
        error: state.error,
        loadWeatherAndRecommendations,
    };

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
}