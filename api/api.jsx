import axios from "axios";

const API_URL =
    "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks";

export const getDeezerTracks = async () => {
    try {
        const res = await axios.get(API_URL, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        return res.data.data;
    } catch (error) {
        console.log("Deezer API error:", error);
        throw error;
    }
};
