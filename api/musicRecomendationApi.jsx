const DEEZER_BASE_URL = 'https://api.deezer.com';

export const getTrackByMood = async (moodKeyword) => {

    const searchParam = moodKeyword.toLowerCase();

    const searchUrl = `${DEEZER_BASE_URL}/search?q=${searchParam}&limit=50`;

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const tracks = data.data;

        if (!tracks || tracks.length === 0) {
            console.warn(`No tracks for such weather ${searchParam}`);
            return [];
        }

        const topTracks = tracks.slice(0, 5);

        const recommendedTracks = topTracks.map(track => ({
            id: track.id,
            title: track.title_short || track.title,
            singer: track.artist.name,
            imgUrl: track.album.cover_big,
            songUrl: track.link || '',
        }));

        return recommendedTracks;

    } catch (error) {
        console.error("Error", error.message);
        return [];
    }
};

const WEATHER_API_KEY = "6KT9CvpByWesVMnP";
const API_URL = "https://my.meteoblue.com/packages/current";
const DEFAULT_LAT = 50.4501;
const DEFAULT_LON = 30.5234;

export const getWeather = async (lat = DEFAULT_LAT, lon = DEFAULT_LON) => {
    const url = `${API_URL}?lat=${lat}&lon=${lon}&apikey=${WEATHER_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}