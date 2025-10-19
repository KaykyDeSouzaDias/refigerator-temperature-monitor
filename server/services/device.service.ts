import { deviceData } from "./../../app/composables/deviceMock";

export async function getAllDevice() {
  const apiKey = useRuntimeConfig().public.thingSpeakReadKey;
  return await $fetch(
    `https://api.thingspeak.com/channels/3100146/feeds.json?api_key=${apiKey}`
  );
  // return deviceData;
}
