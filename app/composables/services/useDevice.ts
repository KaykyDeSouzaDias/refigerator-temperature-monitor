import { getAllDevice } from "@/../server/services/device.service";

export function useGetAllDevice() {
  return useAsyncData(`device`, async () => {
    const response = (await getAllDevice()) as any;
    // return response?.feeds || [];
    return response;
  });
}
