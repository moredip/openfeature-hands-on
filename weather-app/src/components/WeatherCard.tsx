import React from "react";
import {
  Cloud,
  CloudSun,
  CloudRain,
  Sun,
  Snowflake,
  CloudFog,
  CloudLightning,
} from "lucide-react";

export type WeatherCondition =
  | "clear"
  | "partially_cloudy"
  | "cloudy"
  | "rainy"
  | "snow"
  | "fog"
  | "thunder";

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: WeatherCondition, size = "h-12 w-12") => {
  switch (condition) {
    case "clear":
      return <Sun className={`${size} text-amber-500`} />;
    case "partially_cloudy":
      return <CloudSun className={`${size} text-gray-500`} />;
    case "cloudy":
      return <Cloud className={`${size} text-gray-600`} />;
    case "rainy":
      return <CloudRain className={`${size} text-gray-600`} />;
    case "snow":
      return <Snowflake className={`${size} text-blue-400`} />;
    case "fog":
      return <CloudFog className={`${size} text-gray-400`} />;
    case "thunder":
      return <CloudLightning className={`${size} text-yellow-500`} />;
    default:
      return <Sun className={`${size} text-amber-500`} />;
  }
};

const getWeatherText = (condition: WeatherCondition): string => {
  switch (condition) {
    case "clear":
      return "Clear";
    case "partially_cloudy":
      return "Partly Cloudy";
    case "cloudy":
      return "Cloudy";
    case "rainy":
      return "Rain";
    case "snow":
      return "Snow";
    case "fog":
      return "Foggy";
    case "thunder":
      return "Thunderstorm";
    default:
      return "Clear";
  }
};

export function WeatherCard({
  city,
  temperature,
  condition,
  forecast,
}: WeatherCardProps) {
  const mainIcon = getWeatherIcon(condition);
  const conditionText = getWeatherText(condition);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md w-full max-w-md lg:max-w-xl">
      <h2 className="text-4xl font-medium text-gray-700">{city}</h2>
      <div className="mt-4 flex items-center">
        <span className="text-5xl font-light text-gray-900">
          {temperature}°
        </span>
        <div className="ml-auto">{mainIcon}</div>
      </div>
      <div className="mt-6 flex items-center text-gray-500 text-sm">
        {getWeatherIcon(condition, "h-4 w-4 mr-1")}
        <span>{conditionText}</span>
      </div>

      {/* 5-day forecast section */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-medium text-gray-500 mb-3">
          5-DAY FORECAST
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-xs text-gray-400 mb-1">{day.day}</span>
              <div className="px-1 py-2 rounded-md bg-gray-50 flex flex-col items-center">
                <div className="mb-1">
                  {getWeatherIcon(day.condition, "h-6 w-6")}
                </div>
                <div className="text-xs">
                  <span className="font-medium text-gray-900">{day.high}°</span>
                  <span className="text-gray-400 ml-1">{day.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
