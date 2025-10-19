export const useDevice = defineStore("device", () => {
  const selectedDeviceOtherPage = ref();

  function changeSelectedDevice(value: any) {
    selectedDeviceOtherPage.value = value;
  }

  return { selectedDeviceOtherPage, changeSelectedDevice };
});
