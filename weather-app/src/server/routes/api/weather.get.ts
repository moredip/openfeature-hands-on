import { defineEventHandler, getQuery } from "h3";
import { OpenMeteoWeatherSource } from "../../lib/weatherSources";
import { OpenFeature } from "@openfeature/server-sdk";

const openMeteoWeather = new OpenMeteoWeatherSource();

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  // const includeForecast = query.includeForecast === "true";

  const flags = OpenFeature.getClient();
  const includeForecast = await flags.getBooleanValue(
    "include-forecast",
    false
  );

  const locations = await openMeteoWeather.getWeatherForAllLocations(
    includeForecast
  );

  return {
    locations,
    lastUpdated: new Date().toISOString(),
  };
});
