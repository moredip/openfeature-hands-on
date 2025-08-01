import React from "react";
import type { ReactNode } from "react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  icon: ReactNode;
  condition: string;
}

export function WeatherCard({
  city,
  temperature,
  icon,
  condition,
}: WeatherCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <h2 className="text-2xl font-medium text-gray-700">{city}</h2>
      <div className="mt-4 flex items-center">
        <span className="text-5xl font-light text-gray-900">
          {temperature}°C
        </span>
        <div className="ml-auto">{icon}</div>
      </div>
      <div className="mt-6 flex items-center text-gray-500 text-sm">
        {/* Small icon version for the condition */}
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-4 w-4 mr-1",
        })}
        <span>{condition}</span>
      </div>
    </div>
  );
}
