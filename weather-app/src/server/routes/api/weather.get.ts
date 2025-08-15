import { defineEventHandler } from "h3";
import { OpenMeteoWeatherSource } from "../../lib/weatherSources";
import { OpenFeature } from "@openfeature/server-sdk";

const openMeteoWeather = new OpenMeteoWeatherSource();

export default defineEventHandler(async () => {
  const flags = OpenFeature.getClient();
  const result = await flags.getBooleanDetails("include-forecast", false);
  console.log({ result });
  const includeForecast = result.value;

  const locations = await openMeteoWeather.getWeatherForAllLocations(
    includeForecast
  );

  return {
    locations,
    lastUpdated: new Date().toISOString(),
  };
});
