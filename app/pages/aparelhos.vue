<script setup>
import { ChevronRight } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

const { data, pending, error, refresh } = await useGetAllDevice();
const { changeSelectedDevice } = useDeviceStore();

const deviceList = computed(() => data.value);
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

const filters = ref({
  search: "",
  location: [],
});

const filteredDevices = computed(() => {
  const searchFilter = filters.value.search;
  const locationFilter = new Set(filters.value.location);

  return visibleDevices.value.filter(({ field2, field3, field4 }) => {
    if (searchFilter) {
      const check =
        field2.includes(searchFilter) || field3.includes(searchFilter);
      if (!check) return false;
    }
    if (locationFilter.size > 0) {
      const check = locationFilter.has(field4);
      if (!check) return false;
    }

    return true;
  });
});

const headers = ref([
  { title: "Nome", key: "field2", align: "start" },
  { title: "Código", key: "field3" },
  { title: "Localização", key: "field4" },
  { title: "Temperatura (°C)", key: "field5" },
  { title: "", key: "actions", align: "end", sortable: false },
]);

async function reset() {
  await fetch(
    `https://api.thingspeak.com/channels/3100146/feeds.json?api_key=PTRQOAVX4RPVEOFU`,
    {
      method: "DELETE",
    }
  );
}

async function goToDevice(device) {
  changeSelectedDevice(device);
  await navigateTo("/");
}
</script>

<template>
  <PageStructure title="Aparelhos">
    <v-sheet border rounded class="pa-4">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <v-text-field
            v-model="filters.search"
            label="Pesquise pelo Nome ou Código..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-select
            v-model="filters.location"
            :items="deviceList.map((book) => book.field4)"
            label="Localização"
            clearable
            multiple
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>

        <v-sheet border rounded>
          <v-data-table
            :headers="headers"
            :items="filteredDevices"
            :loading="pending"
            :hide-default-footer="deviceList.length < 11"
          >
            <template v-slot:item.title="{ value }">
              <v-chip
                :text="value"
                border="thin opacity-25"
                prepend-icon="mdi-book"
                label
              >
                <template v-slot:prepend>
                  <v-icon color="medium-emphasis"></v-icon>
                </template>
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon-btn
                variant="tonal"
                rounded="lg"
                width="40px"
                height="30px"
                @click="goToDevice(item)"
              >
                <ChevronRight />
              </v-icon-btn>
            </template>

            <template v-slot:no-data>
              <v-empty-state
                icon="mdi-magnify"
                text="Tente filtrar novamente ou entre em contato com o seu administrador."
                title="Nada foi encontrado"
              ></v-empty-state>
            </template>
          </v-data-table>
        </v-sheet>
      </div>
    </v-sheet>
  </PageStructure>
</template>
