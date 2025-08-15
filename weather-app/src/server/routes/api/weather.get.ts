import { defineEventHandler } from "h3";
import { OpenMeteoWeatherSource } from "../../lib/weatherSources";

const openMeteoWeather = new OpenMeteoWeatherSource();

export default defineEventHandler(async () => {
  const includeForecast = false;

  const locations = await openMeteoWeather.getWeatherForAllLocations(
    includeForecast
  );

  return {
    locations,
    lastUpdated: new Date().toISOString(),
  };
});
