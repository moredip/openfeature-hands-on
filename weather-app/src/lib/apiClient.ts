import { useQuery } from "@tanstack/react-query";

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

interface WeatherData {
  city: string;
  temperatureC: number;
  condition: WeatherCondition;
  forecast: ForecastDay[] | null;
}

interface WeatherResponse {
  locations: WeatherData[];
  lastUpdated: string;
}

async function fetchCurrentWeather(
  includeForecast: boolean
): Promise<WeatherResponse> {
  const url = new URL("/api/weather", window.location.origin);
  url.searchParams.set("includeForecast", includeForecast.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}

export function useCurrentWeather(includeForecast: boolean = false) {
  return useQuery({
    queryKey: ["weather", "current", includeForecast],
    queryFn: () => fetchCurrentWeather(includeForecast),
  });
}
