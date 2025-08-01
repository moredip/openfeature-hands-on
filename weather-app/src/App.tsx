import { Cloud, CloudRain, Sun } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { Header } from "@/components/Header";
import { useCurrentWeather } from "@/lib/apiClient";

const getWeatherDisplay = (condition: string) => {
  switch (condition) {
    case "sunny":
      return {
        icon: <Sun className="h-12 w-12 text-amber-500" />,
        text: "Sunny"
      };
    case "cloudy":
      return {
        icon: <Cloud className="h-12 w-12 text-gray-600" />,
        text: "Cloudy"
      };
    case "rainy":
      return {
        icon: <CloudRain className="h-12 w-12 text-gray-600" />,
        text: "Light Rain"
      };
    default:
      return {
        icon: <Sun className="h-12 w-12 text-amber-500" />,
        text: "Clear"
      };
  }
};

export default function WeatherApp() {
  const { data: weatherData, isLoading, error } = useCurrentWeather();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading weather data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weatherData?.map((weather) => {
              const display = getWeatherDisplay(weather.condition);
              return (
                <WeatherCard
                  key={weather.city}
                  city={weather.city}
                  temperature={weather.temperatureC}
                  icon={display.icon}
                  condition={display.text}
                />
              );
            })}
          </div>

          <p className="text-xs text-center text-gray-400 mt-12">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  );
}
