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
import WeatherData from "@/interfaces/JSON/WeatherData";

// https://api.openweathermap.org/data/2.5/forecast?q=Melbourne,au&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2

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

  const firstDayData = data?.list[0];

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
