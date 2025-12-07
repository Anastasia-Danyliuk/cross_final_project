const API_KEY = '816818fa1a1a48cc90f95308250712';
const BASE_URL = 'https://api.weatherapi.com/v1';


export const getCurrentWeather = async (location) => {
    try {
        const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error API: ${response.status} ${response.statusText || ''}`);
        }

        const data = await response.json();

        return {
            locationName: data.location.name,
            country: data.location.country,
            temp_c: data.current.temp_c,
            conditionCode: data.current.condition.code,
            conditionText: data.current.condition.text,
            icon: data.current.condition.icon,
        };

    } catch (error) {
        throw new Error(`Failed to get current weather: ${error}.`);
    }
};


const MOCK_MUSIC_BANKS = {
    SUNNY: [
        { id: 'm101', title: "Літній дощ", singer: "Скай", imgUrl: "https://picsum.photos/100/100?random=1", songUrl: "#" },
        { id: 'm102', title: "На сонячній стороні", singer: "Монатік", imgUrl: "https://picsum.photos/100/100?random=2", songUrl: "#" },
    ],
    RAINY: [
        { id: 'm201', title: "Дощ", singer: "Воплі Відоплясова", imgUrl: "https://picsum.photos/100/100?random=4", songUrl: "#" },
        { id: 'm202', title: "Тихий час", singer: "Океан Ельзи", imgUrl: "https://picsum.photos/100/100?random=5", songUrl: "#" },
    ],
    COLD: [
        { id: 'm301', title: "Зима", singer: "Плач Єремії", imgUrl: "https://picsum.photos/100/100?random=7", songUrl: "#" },
        { id: 'm302', title: "Холод", singer: "ДахаБраха", imgUrl: "https://picsum.photos/100/100?random=8", songUrl: "#" },
    ],
    DEFAULT: [
        { id: 'm401', title: "Україна", singer: "Тіна Кароль", imgUrl: "https://picsum.photos/100/100?random=9", songUrl: "#" },
    ]
};

export const getMusicRecommendation = (conditionCode, temp_c) => {
    if (conditionCode === 1000 && temp_c > 15) {
        return MOCK_MUSIC_BANKS.SUNNY;
    }
    if (conditionCode >= 1183 && conditionCode <= 1195) {
        return MOCK_MUSIC_BANKS.RAINY;
    }
    if (temp_c < 5 || conditionCode >= 1213) {
        return MOCK_MUSIC_BANKS.COLD;
    }

    return MOCK_MUSIC_BANKS.DEFAULT;
};