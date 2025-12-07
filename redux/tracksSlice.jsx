import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    saved: [],
};

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        saveTrack: (state, action) => {
            const newTrack = action.payload;
            const trackId = String(newTrack.id);
            const exists = state.saved.some(track => String(track.id) === trackId);

            if (!exists) {
                state.saved.push({ ...newTrack, id: trackId });
            }
        },

        addToFavorites: (state, action) => {
            const newTrack = action.payload;
            const trackId = String(newTrack.id);
            const exists = state.favorites.some(track => String(track.id) === trackId);

            if (!exists) {
                state.favorites.push({ ...newTrack, id: trackId });
            }
        },

        removeFromSaved: (state, action) => {
            const idToRemove = String(action.payload);
            state.saved = state.saved.filter(track => String(track.id) !== idToRemove);
        },

        removeFromFavorites: (state, action) => {
            const idToRemove = String(action.payload);
            state.favorites = state.favorites.filter(track => String(track.id) !== idToRemove);
        },
    },
});

export const { saveTrack, addToFavorites, removeFromSaved, removeFromFavorites } = tracksSlice.actions;

export default tracksSlice.reducer;