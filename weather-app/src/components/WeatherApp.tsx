import { WeatherCard } from "@/components/WeatherCard";
import { Header } from "@/components/Header";
import { useCurrentWeather } from "@/lib/apiClient";

export function WeatherApp() {
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
            {weatherResponse?.locations.map((weather) => (
              <WeatherCard
                key={weather.city}
                city={weather.city}
                temperature={weather.temperatureC}
                condition={weather.condition}
                forecast={weather.forecast}
              />
            ))}
          </div>

          <p className="text-xs text-center text-gray-400 mt-12">
            As of: {new Date(weatherResponse.lastUpdated).toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  );
}