import WeatherDetailProps from "./WeatherDetailProps";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default ForecastWeatherDetailProps;
