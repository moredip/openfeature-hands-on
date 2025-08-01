import { Cloud, CloudRain, Sun } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { Header } from "@/components/Header";
import { useCurrentWeather, type WeatherCondition } from "@/lib/apiClient";

const getWeatherIcon = (condition: WeatherCondition, size = "h-12 w-12") => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${size} text-amber-500`} />;
    case "cloudy":
      return <Cloud className={`${size} text-gray-600`} />;
    case "rainy":
      return <CloudRain className={`${size} text-gray-600`} />;
    default:
      return <Sun className={`${size} text-amber-500`} />;
  }
};

const getWeatherDisplay = (condition: WeatherCondition) => {
  switch (condition) {
    case "sunny":
      return {
        icon: getWeatherIcon(condition),
        text: "Sunny",
      };
    case "cloudy":
      return {
        icon: getWeatherIcon(condition),
        text: "Cloudy",
      };
    case "rainy":
      return {
        icon: getWeatherIcon(condition),
        text: "Light Rain",
      };
    default:
      return {
        icon: getWeatherIcon(condition),
        text: "Clear",
      };
  }
};

export default function WeatherApp() {
  const { data: weatherResponse, isLoading } = useCurrentWeather();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading weather...</div>
      </div>
    );
  }

  if (!weatherResponse) {
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
            {weatherResponse?.locations.map((weather) => {
              const display = getWeatherDisplay(weather.condition);
              const forecastWithIcons = weather.forecast.map(day => ({
                day: day.day,
                high: day.high,
                low: day.low,
                icon: getWeatherIcon(day.condition, "h-6 w-6")
              }));
              
              return (
                <WeatherCard
                  key={weather.city}
                  city={weather.city}
                  temperature={weather.temperatureC}
                  icon={display.icon}
                  condition={display.text}
                  forecast={forecastWithIcons}
                />
              );
            })}
          </div>

          <p className="text-xs text-center text-gray-400 mt-12">
            As of: {new Date(weatherResponse.lastUpdated).toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  );
}
