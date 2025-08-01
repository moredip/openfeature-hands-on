import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  return {
    locations: [
      {
        city: "Seattle",
        temperatureC: 12,
        condition: "cloudy",
        forecast: [
          { day: "Mon", high: 14, low: 8, condition: "rainy" },
          { day: "Tue", high: 16, low: 10, condition: "cloudy" },
          { day: "Wed", high: 18, low: 12, condition: "sunny" },
          { day: "Thu", high: 15, low: 9, condition: "cloudy" },
          { day: "Fri", high: 13, low: 7, condition: "rainy" }
        ]
      },
      {
        city: "London", 
        temperatureC: 9,
        condition: "rainy",
        forecast: [
          { day: "Mon", high: 11, low: 6, condition: "rainy" },
          { day: "Tue", high: 13, low: 8, condition: "cloudy" },
          { day: "Wed", high: 15, low: 10, condition: "cloudy" },
          { day: "Thu", high: 12, low: 7, condition: "rainy" },
          { day: "Fri", high: 10, low: 5, condition: "rainy" }
        ]
      },
      {
        city: "Shanghai",
        temperatureC: 24,
        condition: "sunny",
        forecast: [
          { day: "Mon", high: 26, low: 20, condition: "sunny" },
          { day: "Tue", high: 28, low: 22, condition: "sunny" },
          { day: "Wed", high: 25, low: 19, condition: "cloudy" },
          { day: "Thu", high: 23, low: 17, condition: "rainy" },
          { day: "Fri", high: 27, low: 21, condition: "sunny" }
        ]
      }
    ],
    lastUpdated: new Date().toISOString()
  };
});