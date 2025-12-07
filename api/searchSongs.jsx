const DEEZER_BASE_URL = "https://api.deezer.com/search";

export const searchDeezerTracks = async (query) => {
    if (!query || query.trim() === '') {
        return [];
    }

    const url = `${DEEZER_BASE_URL}?q=${encodeURIComponent(query)}&limit=10`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const tracks = data.data;

        if (!tracks || tracks.length === 0) {
            return [];
        }

        const formattedTracks = tracks.map(track => ({
            id: track.id,
            title: track.title_short || track.title,
            singer: track.artist.name,
            imgUrl: track.album.cover_big,
            songUrl: track.link || '',
        }));

        return formattedTracks;

    } catch (error) {
        console.error("Error", error.message);
        return [];
    }
};