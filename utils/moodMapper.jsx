export const getMoodKeyword = (weatherDescription) => {
    const desc = weatherDescription.toLowerCase();

    if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('thunderstorm')) {
        return 'lo-fi';
    }
    if (desc.includes('snow') || desc.includes('sleet')) {
        return 'instrumental classical';
    }
    if (desc.includes('clear') || desc.includes('sun')) {
        return 'dance pop';
    }
    if (desc.includes('cloud') || desc.includes('mist') || desc.includes('fog')) {
        return 'indie rock';
    }
    return 'jazz';
};