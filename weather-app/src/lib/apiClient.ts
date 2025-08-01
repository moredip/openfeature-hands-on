import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  city: string;
  temperatureC: number;
  condition: string;
}

async function fetchCurrentWeather(): Promise<WeatherData[]> {
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
