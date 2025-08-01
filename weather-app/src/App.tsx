import { Cloud, CloudRain, Sun } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { Header } from "@/components/Header";

export default function WeatherApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WeatherCard
              city="Seattle"
              temperature={12}
              icon={<Cloud className="h-12 w-12 text-gray-600" />}
              condition="Cloudy"
            />

            <WeatherCard
              city="London"
              temperature={9}
              icon={<CloudRain className="h-12 w-12 text-gray-600" />}
              condition="Light Rain"
            />

            <WeatherCard
              city="Shanghai"
              temperature={24}
              icon={<Sun className="h-12 w-12 text-amber-500" />}
              condition="Sunny"
            />
          </div>

          <p className="text-xs text-center text-gray-400 mt-12">
            Last updated: August 1, 2025 at 3:04 PM
          </p>
        </div>
      </main>
    </div>
  );
}
