<script setup>
import { ref, computed, nextTick } from "vue";
import { LayoutGrid, Rows3 } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

const { data, pending, error, refresh } = await useGetAllDevice();
const store = useDeviceStore();
const { selectedDeviceOtherPage } = storeToRefs(store);

const deviceList = computed(() => data.value);
const gridView = useState("gridView", () => "grid");
const hasSearched = ref(false);
const canInitCharts = ref(false);

const selectedDevices = useState("selected", () => []);
const selectAllDevices = computed(() => {
  return selectedDevices.value.length === visibleDevices.value.length;
});
const selectSomeDevices = computed(() => {
  return selectedDevices.value.length > 0;
});

const groupedDevices = computed(() => {
  const map = {};
  for (const item of deviceList.value) {
    const id = item.field1;
    if (!map[id]) map[id] = [];
    map[id].push(item);
  }
  for (const id in map) {
    map[id].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }
  return Object.values(map);
});

const visibleDevices = computed(() => {
  return groupedDevices.value.map((group) => group[group.length - 1]);
});

const filteredDevices = computed(() => {
  return visibleDevices.value.filter((device) =>
    selectedDevices.value.includes(device.field3)
  );
});

onMounted(() => {
  const formatted = toRaw(selectedDeviceOtherPage.value);
  if (formatted) {
    selectedDevices.value = [formatted.field3];
  }
});

watch(selectedDevices, (newVal) => {
  if (newVal.length > 0) {
    hasSearched.value = false;
  } else {
    hasSearched.value = true;
  }
});

const initCharts = async () => {
  hasSearched.value = true;
  await nextTick();
  canInitCharts.value = true;
};

function toggle() {
  if (selectAllDevices.value) {
    selectedDevices.value = [];
    hasSearched.value = false;
  } else {
    selectedDevices.value = visibleDevices.value.map((device) => device.field3);
  }
}
</script>

<template>
  <PageStructure title="Monitoramento">
    <div v-if="deviceList.length > 0" class="flex flex-col gap-4">
      <div class="flex items-center justify-end gap-4">
        <v-select
          multiple
          hide-details
          label="Selecione um aparelho"
          :max-width="400"
          v-model="selectedDevices"
          :items="
            visibleDevices.map((device) => ({
              title: device.field2,
              subtitle: device.field3,
            }))
          "
          item-title="title"
          item-value="subtitle"
          variant="outlined"
          density="compact"
        >
          <template v-slot:prepend-item>
            <v-list-item title="Selecionar todos" @click="toggle">
              <template v-slot:prepend>
                <v-checkbox-btn
                  :color="selectSomeDevices ? 'indigo-darken-4' : undefined"
                  :indeterminate="selectSomeDevices && !selectAllDevices"
                  :model-value="selectAllDevices"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-divider class="mt-2"></v-divider>
          </template>

          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 2" :text="item.title"></v-chip>

            <span
              v-if="index === 2"
              class="text-black text-caption align-self-center"
            >
              (+{{ selectedDevices.length - 2 }} outros)
            </span>
          </template>
        </v-select>

        <v-btn
          :disabled="selectedDevices.length <= 0"
          color="teal"
          @click="initCharts()"
        >
          Gerar gráficos
        </v-btn>

        <v-btn-toggle
          v-model="gridView"
          color="secondary"
          divided
          border
          mandatory
        >
          <v-btn value="grid" size="x-small">
            <LayoutGrid :size="18" />
          </v-btn>
          <v-btn value="rows" size="x-small">
            <Rows3 :size="18" />
          </v-btn>
        </v-btn-toggle>
      </div>

      <DeviceCard
        :isVisible="selectedDevices.length > 0"
        :viewMode="gridView"
        :devices="filteredDevices"
      >
        <template v-slot="{ item }">
          <DeviceChart
            :isVisible="selectedDevices.length > 0 && hasSearched"
            :canInit="canInitCharts"
            :currentDevice="item"
            :groupedDevices="groupedDevices"
          />
        </template>
      </DeviceCard>
    </div>

    <div v-else class="flex items-center justify-center h-110">
      <v-empty-state
        icon="mdi-magnify"
        text="Tente filtrar novamente ou entre em contato com o seu administrador."
        title="Nada foi encontrado"
      />
    </div>
  </PageStructure>
</template>
