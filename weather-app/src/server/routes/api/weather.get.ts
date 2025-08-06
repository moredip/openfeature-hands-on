import { defineEventHandler, getQuery } from "h3";
import { OpenMeteoWeatherSource } from "../../lib/weatherSources";
import { useFeatureFlags } from "../..//utils/featureFlags";

const openMeteoWeather = new OpenMeteoWeatherSource();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const includeForecast = query.includeForecast === "true";

  // const flags = useFeatureFlags(event);
  // const includeForecast = await flags.getBooleanValue("include-forecast", true);

  const locations = await openMeteoWeather.getWeatherForAllLocations(
    includeForecast
  );

  return {
    locations,
    lastUpdated: new Date().toISOString(),
  };
});
