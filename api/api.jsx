const API_URL =
    "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks";

export const getDeezerTracks = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data;

    } catch (error) {
        console.log("Deezer API error:", error);
        throw error;
    }
};