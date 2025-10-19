<script setup>
import { ref, computed, nextTick } from "vue";
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Cctv,
  LayoutGrid,
  Rows3,
} from "lucide-vue-next";

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

      <div
        v-if="selectedDevices.length > 0"
        :class="
          gridView === 'grid'
            ? 'w-full grid grid-cols-2 gap-4'
            : 'w-full flex flex-col gap-4'
        "
      >
        <v-card v-for="item in filteredDevices" :key="item.field3" rounded="sm">
          <v-card-item>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500"
                >
                  <Cctv :size="18" color="white" />
                </div>
                <h3 class="text-sm font-semibold text-black">
                  {{ item.field2 }} - {{ item.field3 }}
                </h3>
              </div>

              <v-chip
                :color="
                  Math.abs(item.field5 - item.field6) > item.field7
                    ? 'red'
                    : item.field5 !== item.field6
                    ? 'amber'
                    : 'green'
                "
                class="flex items-center gap-1"
                density="compact"
              >
                <template v-slot:prepend>
                  <ThermometerSun v-if="item.field5 > item.field6" :size="18" />
                  <ThermometerSnowflake
                    v-else-if="item.field5 < item.field6"
                    :size="18"
                  />
                  <Thermometer v-else :size="18" />
                </template>
                <span class="text-xs font-semibold"> {{ item.field5 }}° </span>
              </v-chip>
            </div>
          </v-card-item>

          <v-divider class="mb-0" />
          <div
            v-if="item.field5 !== item.field6"
            :class="`flex items-center justify-center pa-1 ${
              Math.abs(item.field5 - item.field6) > item.field7
                ? 'bg-red-500'
                : 'bg-amber-500'
            }`"
          >
            <span class="text-sm text-white">
              <template
                v-if="Math.abs(item.field5 - item.field6) > item.field7"
              >
                {{
                  item.field5 > item.field6
                    ? "Temperatura muito acima!"
                    : "Temperatura muito abaixo!"
                }}
              </template>
              <template v-else-if="item.field5 > item.field6">
                Temperatura acima, mas dentro da margem!
              </template>
              <template v-else>
                Temperatura abaixo, porém dentro da margem!
              </template>
            </span>
          </div>

          <div class="pa-4">
            <DeviceChart
              :isVisible="selectedDevices.length > 0 && hasSearched"
              :canInit="canInitCharts"
              :currentDevice="item"
              :groupedDevices="groupedDevices"
            />
          </div>
        </v-card>
      </div>

      <div v-else class="flex items-center justify-center h-110">
        <v-empty-state
          icon="mdi-magnify"
          text="Tente selecionar pelo menos um aparelho ou entre em contato com o seu administrador."
          title="Nada foi encontrado"
        />
      </div>
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
