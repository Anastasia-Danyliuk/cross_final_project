import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ThemeProvider from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <WeatherProvider>
                <NavigationContainer>
                    <StackNavigation />
                </NavigationContainer>
                </WeatherProvider>
            </ThemeProvider>
        </Provider>
    );
}
