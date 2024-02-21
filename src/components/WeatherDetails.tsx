/** @format */

import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hpa",
        sunrise = "6.20",
        sunset = "18.48",
    } = props;

  return (
    <>
        <SingeDayWeatherDetail
            information="Visibility"
            icon={<LuEye />}
            value={props.visibility}
        />
        <SingeDayWeatherDetail
            information="Humidity"
            icon={<FiDroplet />}
            value={props.humidity}
        />
        <SingeDayWeatherDetail
            information="Wind Speed"
            icon={<MdAir />}
            value={props.windSpeed}
        />
        <SingeDayWeatherDetail
            information="Air Pressure"
            icon={<ImMeter />}
            value={props.airPressure}
        />
        <SingeDayWeatherDetail
            information="Sunrise"
            icon={<LuSunrise />}
            value={props.sunrise}
        />
        <SingeDayWeatherDetail
            information="Sunset"
            icon={<LuSunset />}
            value={props.sunset}
        />
    </>
  )
}

export interface SingeDayWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingeDayWeatherDetail(props: SingeDayWeatherDetailProps) {
    return (
        <div className="flex flex-col gap-2 justify-between items-center text-xs font-semibold text-black/80">
            {" "}
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">
                {props.icon}
            </div>
            <p className="">{props.value}</p>
        </div>
    );
}
