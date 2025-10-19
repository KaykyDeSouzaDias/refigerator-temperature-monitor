import { deviceData } from "./../../app/composables/deviceMock";

export async function getAllDevice() {
  //   const apiKey = process.env.WEATHER_API_KEY;
  // return await $fetch(
  //   `https://api.thingspeak.com/channels/3100146/feeds.json?api_key=50UXIL5P0BW6R85T`
  // );
  return deviceData;
}
