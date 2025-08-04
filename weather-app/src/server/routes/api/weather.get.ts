import { defineEventHandler, getQuery } from "h3";
import { OpenMeteoWeatherSource } from "../../lib/weatherSources";

const openMeteoWeather = new OpenMeteoWeatherSource();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const includeForecast = query.includeForecast === "true";

  const locations = await openMeteoWeather.getWeatherForAllLocations(
    includeForecast
  );

  return {
    locations,
    lastUpdated: new Date().toISOString(),
  };
});
