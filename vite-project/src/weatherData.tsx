import React, { useEffect, useState } from 'react';

type WeatherData = {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
};

const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('http://localhost:3000/');
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data: WeatherData = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchWeatherData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weather in {weatherData.name}</h1>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Feels like: {weatherData.main.feels_like}°C</p>
            <p>Min: {weatherData.main.temp_min}°C / Max: {weatherData.main.temp_max}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
            />
        </div>
    );
};

export default WeatherComponent;
