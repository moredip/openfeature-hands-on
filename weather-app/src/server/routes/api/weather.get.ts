import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  return [
    {
      city: "Seattle",
      temperatureC: 12,
      condition: "cloudy"
    },
    {
      city: "London", 
      temperatureC: 9,
      condition: "rainy"
    },
    {
      city: "Shanghai",
      temperatureC: 24,
      condition: "sunny"
    }
  ];
});