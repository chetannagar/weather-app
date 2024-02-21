/** @format */
'use client'

import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";

// https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=884766e8823ad1bae4e4602c7d22ab5b=56
// https://api.openweathermap.org/data/2.5/forecast?q=Melbourne,au&cnt=2&APPID=5285d8184bf19b4598e77f35f3bcee52

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Melbourne,au&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );

  const firstDayData = data?.list[0]; // .slice(0, 8);

  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <NavBar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p> {format(parseISO(firstDayData?.dt_txt ?? ""), "EEEE")} </p>
                <p className="text-lg"> ({format(parseISO(firstDayData?.dt_txt ?? ""), "dd.MM.yyyy")}) </p>
              </h2>
              <Container className="gap-10 px-6 items-center">
                {/* temperature */}
                <div className="flex flex-col px-4 ">
                  <span className="text-5xl">
                    {convertKelvinToCelsius(firstDayData?.main.temp ?? 296.37)}°C
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels Like</span>
                    <span className="">
                      {convertKelvinToCelsius(firstDayData?.main.feels_like ?? 0)}°C
                    </span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>
                      {convertKelvinToCelsius(firstDayData?.main.temp_min ?? 0)}
                      °↓{" "}
                    </span>
                    <span>
                      {" "}
                      {convertKelvinToCelsius(firstDayData?.main.temp_max ?? 0)}
                      °↑
                    </span>
                  </p>
                </div>
                {/* time and weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) =>
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(parseISO(d.dt_txt), "H:mm a")}
                      </p>
                      <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                      <p className="">
                        {convertKelvinToCelsius(d?.main.temp ?? 0)}°C
                      </p>
                    </div>
                  )}
                </div>
              </Container>
            </div>
          </section>

          {/* 7 day forecast data */}
          <section className="flex flex-col w-full gap-4">
            <p className="text-2xl">Forecast (7 days)</p>
          </section>
        </main>
      </div>
    </>
  );
}
