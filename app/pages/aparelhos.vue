<script setup>
import { ChevronRight } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

const { data, pending, error, refresh } = await useGetAllDevice();
const { changeSelectedDevice } = useDevice();

const books = useState("books", () => [
  // --- Aparelho 01 ---
  {
    field1: 1,
    field2: "Aparelho 01",
    field3: "kd9f3j2o1a",
    field4: "Niterói",
    field5: 25.0,
    field6: 25.0,
    field7: 2.5,
    created_at: "2025-10-12T18:19:25Z",
  },
  {
    field1: 1,
    field2: "Aparelho 01",
    field3: "kd9f3j2o1a",
    field4: "Niterói",
    field5: 26.0,
    field6: 25.0,
    field7: 2.5,
    created_at: "2025-10-12T18:29:25Z",
  },
  {
    field1: 1,
    field2: "Aparelho 01",
    field3: "kd9f3j2o1a",
    field4: "Niterói",
    field5: 24.8,
    field6: 25.0,
    field7: 2.5,
    created_at: "2025-10-12T18:39:25Z",
  },

  // --- Aparelho 02 (alerta) ---
  {
    field1: 2,
    field2: "Aparelho 02",
    field3: "pl2o9x8z7b",
    field4: "Rio de Janeiro",
    field5: 28.5,
    field6: 26.0,
    field7: 1.5,
    created_at: "2025-10-12T18:15:10Z",
  },
  {
    field1: 2,
    field2: "Aparelho 02",
    field3: "pl2o9x8z7b",
    field4: "Rio de Janeiro",
    field5: 29.8,
    field6: 26.0,
    field7: 1.5,
    created_at: "2025-10-12T18:25:10Z",
  },
  {
    field1: 2,
    field2: "Aparelho 02",
    field3: "pl2o9x8z7b",
    field4: "Rio de Janeiro",
    field5: 26.0,
    field6: 26.0,
    field7: 1.5,
    created_at: "2025-10-12T18:35:10Z",
  },

  // --- Aparelho 03 ---
  {
    field1: 3,
    field2: "Aparelho 03",
    field3: "mn6r3t0e9y",
    field4: "São Paulo",
    field5: 22.0,
    field6: 21.0,
    field7: 2.0,
    created_at: "2025-10-12T17:59:40Z",
  },
  {
    field1: 3,
    field2: "Aparelho 03",
    field3: "mn6r3t0e9y",
    field4: "São Paulo",
    field5: 23.0,
    field6: 21.0,
    field7: 2.0,
    created_at: "2025-10-12T18:09:40Z",
  },
  {
    field1: 3,
    field2: "Aparelho 03",
    field3: "mn6r3t0e9y",
    field4: "São Paulo",
    field5: 21.5,
    field6: 21.0,
    field7: 2.0,
    created_at: "2025-10-12T18:19:40Z",
  },

  // --- Aparelho 04 (alerta) ---
  {
    field1: 4,
    field2: "Aparelho 04",
    field3: "qz9x1c2v8b",
    field4: "Curitiba",
    field5: 15.0,
    field6: 18.0,
    field7: 2.0,
    created_at: "2025-10-12T17:50:15Z",
  },
  {
    field1: 4,
    field2: "Aparelho 04",
    field3: "qz9x1c2v8b",
    field4: "Curitiba",
    field5: 14.0,
    field6: 18.0,
    field7: 2.0,
    created_at: "2025-10-12T18:00:15Z",
  },
  {
    field1: 4,
    field2: "Aparelho 04",
    field3: "qz9x1c2v8b",
    field4: "Curitiba",
    field5: 19.5,
    field6: 18.0,
    field7: 2.0,
    created_at: "2025-10-12T18:10:15Z",
  },

  // --- Aparelho 05 ---
  {
    field1: 5,
    field2: "Aparelho 05",
    field3: "we4r6t8y0u",
    field4: "Fortaleza",
    field5: 30.0,
    field6: 29.0,
    field7: 2.0,
    created_at: "2025-10-12T18:03:55Z",
  },
  {
    field1: 5,
    field2: "Aparelho 05",
    field3: "we4r6t8y0u",
    field4: "Fortaleza",
    field5: 28.5,
    field6: 29.0,
    field7: 2.0,
    created_at: "2025-10-12T18:13:55Z",
  },
  {
    field1: 5,
    field2: "Aparelho 05",
    field3: "we4r6t8y0u",
    field4: "Fortaleza",
    field5: 31.2,
    field6: 29.0,
    field7: 2.0,
    created_at: "2025-10-12T18:23:55Z",
  },

  // --- Aparelho 06 (alerta) ---
  {
    field1: 6,
    field2: "Aparelho 06",
    field3: "as2d4f6g8h",
    field4: "Belo Horizonte",
    field5: 19.5,
    field6: 25.0,
    field7: 3.0,
    created_at: "2025-10-12T17:45:00Z",
  },
  {
    field1: 6,
    field2: "Aparelho 06",
    field3: "as2d4f6g8h",
    field4: "Belo Horizonte",
    field5: 22.0,
    field6: 25.0,
    field7: 3.0,
    created_at: "2025-10-12T17:55:00Z",
  },
  {
    field1: 6,
    field2: "Aparelho 06",
    field3: "as2d4f6g8h",
    field4: "Belo Horizonte",
    field5: 26.5,
    field6: 25.0,
    field7: 3.0,
    created_at: "2025-10-12T18:05:00Z",
  },

  // --- Aparelho 07 ---
  {
    field1: 7,
    field2: "Aparelho 07",
    field3: "zx9c8v7b6n",
    field4: "Recife",
    field5: 30.0,
    field6: 30.0,
    field7: 1.5,
    created_at: "2025-10-12T18:11:11Z",
  },
  {
    field1: 7,
    field2: "Aparelho 07",
    field3: "zx9c8v7b6n",
    field4: "Recife",
    field5: 29.7,
    field6: 30.0,
    field7: 1.5,
    created_at: "2025-10-12T18:21:11Z",
  },
  {
    field1: 7,
    field2: "Aparelho 07",
    field3: "zx9c8v7b6n",
    field4: "Recife",
    field5: 31.0,
    field6: 30.0,
    field7: 1.5,
    created_at: "2025-10-12T18:31:11Z",
  },

  // --- Aparelho 08 ---
  {
    field1: 8,
    field2: "Aparelho 08",
    field3: "ty7u6i5o4p",
    field4: "Porto Alegre",
    field5: 19.0,
    field6: 20.0,
    field7: 2.0,
    created_at: "2025-10-12T17:58:00Z",
  },
  {
    field1: 8,
    field2: "Aparelho 08",
    field3: "ty7u6i5o4p",
    field4: "Porto Alegre",
    field5: 20.5,
    field6: 20.0,
    field7: 2.0,
    created_at: "2025-10-12T18:08:00Z",
  },
  {
    field1: 8,
    field2: "Aparelho 08",
    field3: "ty7u6i5o4p",
    field4: "Porto Alegre",
    field5: 22.5,
    field6: 20.0,
    field7: 2.0,
    created_at: "2025-10-12T18:18:00Z",
  },

  // --- Aparelho 09 (alerta) ---
  {
    field1: 9,
    field2: "Aparelho 09",
    field3: "gh5j4k3l2m",
    field4: "Vitória",
    field5: 20.0,
    field6: 27.0,
    field7: 3.0,
    created_at: "2025-10-12T17:42:00Z",
  },
  {
    field1: 9,
    field2: "Aparelho 09",
    field3: "gh5j4k3l2m",
    field4: "Vitória",
    field5: 24.5,
    field6: 27.0,
    field7: 3.0,
    created_at: "2025-10-12T17:52:00Z",
  },
  {
    field1: 9,
    field2: "Aparelho 09",
    field3: "gh5j4k3l2m",
    field4: "Vitória",
    field5: 29.0,
    field6: 27.0,
    field7: 3.0,
    created_at: "2025-10-12T18:02:00Z",
  },

  // --- Aparelho 10 ---
  {
    field1: 10,
    field2: "Aparelho 10",
    field3: "bn1m2q3w4e",
    field4: "Salvador",
    field5: 28.0,
    field6: 29.0,
    field7: 1.5,
    created_at: "2025-10-12T17:55:55Z",
  },
  {
    field1: 10,
    field2: "Aparelho 10",
    field3: "bn1m2q3w4e",
    field4: "Salvador",
    field5: 30.5,
    field6: 29.0,
    field7: 1.5,
    created_at: "2025-10-12T18:05:55Z",
  },
  {
    field1: 10,
    field2: "Aparelho 10",
    field3: "bn1m2q3w4e",
    field4: "Salvador",
    field5: 27.0,
    field6: 29.0,
    field7: 1.5,
    created_at: "2025-10-12T18:15:55Z",
  },
]);
const groupedDevices = computed(() => {
  const map = {};
  for (const item of books.value) {
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

const filteredBooks = computed(() => {
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

// watch(data, (newVal) => {
//   books.value = newVal;
// });

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
            :items="books.map((book) => book.field4)"
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
            :items="filteredBooks"
            :loading="pending"
            :hide-default-footer="books.length < 11"
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
