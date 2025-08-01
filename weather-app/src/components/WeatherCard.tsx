import React from "react";
import type { ReactNode } from "react";

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  icon: ReactNode;
}

interface WeatherCardProps {
  city: string;
  temperature: number;
  icon: ReactNode;
  condition: string;
  forecast: ForecastDay[];
}

export function WeatherCard({
  city,
  temperature,
  icon,
  condition,
  forecast,
}: WeatherCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <h2 className="text-2xl font-medium text-gray-700">{city}</h2>
      <div className="mt-4 flex items-center">
        <span className="text-5xl font-light text-gray-900">
          {temperature}°
        </span>
        <div className="ml-auto">{icon}</div>
      </div>
      <div className="mt-6 flex items-center text-gray-500 text-sm">
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-4 w-4 mr-1",
        })}
        <span>{condition}</span>
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
                <div className="mb-1">{day.icon}</div>
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
