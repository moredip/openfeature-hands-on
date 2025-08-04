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
  forecast: ForecastDay[] | null;
}

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export const HARD_CODED_WEATHER_LOCATIONS: Location[] = [
  { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
];

export class OpenMeteoWeatherSource {
  private getDayName(date: Date): string {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  }

  async getWeatherForAllLocations(
    includeForecast: boolean
  ): Promise<WeatherData[]> {
    const weatherData: WeatherData[] = [];

    for (const location of HARD_CODED_WEATHER_LOCATIONS) {
      const params = {
        latitude: location.latitude,
        longitude: location.longitude,
        current: ["temperature_2m", "weather_code"],
        ...(includeForecast && {
          daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
          forecast_days: 5,
        }),
        timezone: "auto",
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

      const weatherDataItem: WeatherData = {
        city: location.name,
        temperatureC: currentTemp,
        condition: mapWeatherCodeToCondition(currentWeatherCode),
        forecast: null, // Will be populated if includeForecast is true
      };

      if (includeForecast) {
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
            condition: mapWeatherCodeToCondition(dailyWeatherCode[i]),
          });
        }

        weatherDataItem.forecast = forecast;
      }

      weatherData.push(weatherDataItem);
    }

    return weatherData;
  }

}

function mapWeatherCodeToCondition(weatherCode: number): WeatherCondition {
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
