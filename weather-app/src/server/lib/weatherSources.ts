import { fetchWeatherApi } from "openmeteo";

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
  forecast: ForecastDay[];
}

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export class OpenMeteoWeatherSource {
  private locations: Location[] = [
    { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
  ];

  private mapWeatherCodeToCondition(weatherCode: number): WeatherCondition {
    // Based on WMO weather codes (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)

    // Clear conditions (0-1: clear sky, no clouds)
    if (weatherCode >= 0 && weatherCode <= 1) return "clear";

    // Partially cloudy conditions (2-9: some cloud development)
    if (weatherCode >= 2 && weatherCode <= 9) return "partially_cloudy";

    // Thunderstorm conditions (90-99: thunderstorms with precipitation)
    if (weatherCode >= 90 && weatherCode <= 99) return "thunder";

    // Snow conditions (70-79: solid precipitation)
    if (weatherCode >= 70 && weatherCode <= 79) return "snow";

    // Fog conditions (40-49: fog and visibility reduction)
    if (weatherCode >= 40 && weatherCode <= 49) return "fog";

    // Rain conditions (50-69: drizzle and rain, 80-89: showers)
    if (weatherCode >= 50 && weatherCode <= 69) return "rainy";
    if (weatherCode >= 80 && weatherCode <= 89) return "rainy";

    // Past precipitation (20-29)
    if (weatherCode >= 20 && weatherCode <= 29) return "rainy";

    // Dust, sand, and other atmospheric phenomena (30-39, 10-19)
    if (weatherCode >= 30 && weatherCode <= 39) return "cloudy"; // Dust, sand
    if (weatherCode >= 10 && weatherCode <= 19) return "cloudy"; // Atmospheric phenomena

    return "cloudy"; // default fallback
  }

  private getDayName(date: Date): string {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  }

  async getWeatherForAllLocations(): Promise<WeatherData[]> {
    const weatherData: WeatherData[] = [];

    for (const location of this.locations) {
      try {
        const params = {
          latitude: location.latitude,
          longitude: location.longitude,
          current: ["temperature_2m", "weather_code"],
          daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
          timezone: "auto",
          forecast_days: 5,
        };

        const responses = await fetchWeatherApi(
          "https://api.open-meteo.com/v1/forecast",
          params
        );
        const response = responses[0];

        // Current weather
        const current = response.current()!;
        const currentTemp = Math.round(current.variables(0)!.value());
        const currentWeatherCode = current.variables(1)!.value();

        // Daily forecast
        const daily = response.daily()!;
        const dailyWeatherCode = daily.variables(0)!.valuesArray()!;
        const dailyTempMax = daily.variables(1)!.valuesArray()!;
        const dailyTempMin = daily.variables(2)!.valuesArray()!;

        // Build forecast
        const forecast: ForecastDay[] = [];
        const today = new Date();

        for (let i = 0; i < 5; i++) {
          const forecastDate = new Date(today);
          forecastDate.setDate(today.getDate() + i);

          forecast.push({
            day: this.getDayName(forecastDate),
            high: Math.round(dailyTempMax[i]),
            low: Math.round(dailyTempMin[i]),
            condition: this.mapWeatherCodeToCondition(dailyWeatherCode[i]),
          });
        }

        weatherData.push({
          city: location.name,
          temperatureC: currentTemp,
          condition: this.mapWeatherCodeToCondition(currentWeatherCode),
          forecast,
        });
      } catch (error) {
        console.error(`Failed to fetch weather for ${location.name}:`, error);
        // Fallback to hardcoded data if API fails
        weatherData.push(this.getFallbackWeatherData(location.name));
      }
    }

    return weatherData;
  }

  private getFallbackWeatherData(city: string): WeatherData {
    const fallbackData: Record<string, WeatherData> = {
      Seattle: {
        city: "Seattle",
        temperatureC: 12,
        condition: "cloudy",
        forecast: [
          { day: "Mon", high: 14, low: 8, condition: "rainy" },
          { day: "Tue", high: 16, low: 10, condition: "cloudy" },
          { day: "Wed", high: 18, low: 12, condition: "clear" },
          { day: "Thu", high: 15, low: 9, condition: "cloudy" },
          { day: "Fri", high: 13, low: 7, condition: "rainy" },
        ],
      },
      London: {
        city: "London",
        temperatureC: 9,
        condition: "rainy",
        forecast: [
          { day: "Mon", high: 11, low: 6, condition: "rainy" },
          { day: "Tue", high: 13, low: 8, condition: "cloudy" },
          { day: "Wed", high: 15, low: 10, condition: "cloudy" },
          { day: "Thu", high: 12, low: 7, condition: "rainy" },
          { day: "Fri", high: 10, low: 5, condition: "rainy" },
        ],
      },
      Shanghai: {
        city: "Shanghai",
        temperatureC: 24,
        condition: "clear",
        forecast: [
          { day: "Mon", high: 26, low: 20, condition: "clear" },
          { day: "Tue", high: 28, low: 22, condition: "clear" },
          { day: "Wed", high: 25, low: 19, condition: "cloudy" },
          { day: "Thu", high: 23, low: 17, condition: "rainy" },
          { day: "Fri", high: 27, low: 21, condition: "clear" },
        ],
      },
    };

    return fallbackData[city] || fallbackData["Seattle"];
  }
}
