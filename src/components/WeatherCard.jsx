function WeatherCard({name, weather, main, wind, sys}) {

    const weatherDescription = [
        'Clear',
        'Clouds',
        'Rain',
        'Snow',
        'Thunderstorm',
        'Drizzle',
        'Mist',
        'Smoke',
        'Haze',
        'Dust',
    ]

    const getWeatherBackground = () => {
        const desc = weather[0].main
        switch (true) {
            case desc.includes('Clear'):
                return 'rgba(255,255,255,0.1)';
            case desc.includes('Clouds'):
                return 'rgba(141,141,141,0.1)';
            case desc.includes('Rain'):
                return 'rgba(0,155,248,0.1)';
            case desc.includes('Snow'):
                return 'rgba(248,248,248,0.1)';
            case desc.includes('Thunderstorm'):
                return 'rgba(255,38,29,0.1)';
            default:
                return 'rgba(0, 0, 0, 0.1)';
        }
    }

    return (
        <div className={"weather-card"} style={{background: getWeatherBackground()}}>
            <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                alt={weather[0].description}
            />
            <article className="weather-info">
                <p className="temp">{Math.round(main.temp)}°C</p>
                <p className="description">{weather[0].description}</p>
                <h2>{name}, {sys.country}</h2>
                <div className="details">
                    <p>💧 Humidité : {main.humidity}%</p>
                    <p>💨 Vent : {wind.speed} km/h</p>
                    <p>🌡️ Ressenti : {Math.round(main.feels_like)}°C</p>
                </div>
            </article>
        </div>
    )
}

export default WeatherCard