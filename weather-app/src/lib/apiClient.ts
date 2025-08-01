import { useQuery } from "@tanstack/react-query";

export type WeatherCondition = "clear" | "partially_cloudy" | "cloudy" | "rainy" | "snow" | "fog" | "thunder";

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}

interface WeatherData {
  city: string;
  temperatureC: number;
  condition: WeatherCondition;
  forecast: ForecastDay[];
}

interface WeatherResponse {
  locations: WeatherData[];
  lastUpdated: string;
}

async function fetchCurrentWeather(): Promise<WeatherResponse> {
  const response = await fetch("/api/weather");

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}

export function useCurrentWeather() {
  return useQuery({
    queryKey: ["weather", "current"],
    queryFn: fetchCurrentWeather,
  });
}
