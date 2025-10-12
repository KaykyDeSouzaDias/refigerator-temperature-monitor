<script setup>
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

// const deviceList = computed(() => data.value);
const gridView = useState("gridView", () => "grid");

const selectedDevices = useState("selected", () => []);
const deviceList = ref([
  {
    field1: 1,
    field2: "Aparelho 01",
    field3: "kd9f3j2o1a",
    field4: "Niterói",
    field5: 25.0,
    field6: 25.0, // igual ao ideal
    field7: 2.5,
  },
  {
    field1: 2,
    field2: "Aparelho 02",
    field3: "pl2o9x8z7b",
    field4: "Rio de Janeiro",
    field5: 28.5,
    field6: 26.0,
    field7: 1.5, // fora da margem (ALERTA)
  },
  {
    field1: 3,
    field2: "Aparelho 03",
    field3: "mn6r3t0e9y",
    field4: "São Paulo",
    field5: 22.0,
    field6: 21.0,
    field7: 2.0, // dentro da margem
  },
  {
    field1: 4,
    field2: "Aparelho 04",
    field3: "qz9x1c2v8b",
    field4: "Curitiba",
    field5: 15.0,
    field6: 18.0,
    field7: 2.0, // fora da margem (ALERTA)
  },
  {
    field1: 5,
    field2: "Aparelho 05",
    field3: "we4r6t8y0u",
    field4: "Fortaleza",
    field5: 30.0,
    field6: 29.0,
    field7: 2.0, // dentro da margem
  },
  {
    field1: 6,
    field2: "Aparelho 06",
    field3: "as2d4f6g8h",
    field4: "Belo Horizonte",
    field5: 19.5,
    field6: 25.0,
    field7: 3.0, // fora da margem (ALERTA)
  },
  {
    field1: 7,
    field2: "Aparelho 07",
    field3: "zx9c8v7b6n",
    field4: "Recife",
    field5: 30.0,
    field6: 30.0,
    field7: 1.5, // igual ao ideal
  },
  {
    field1: 8,
    field2: "Aparelho 08",
    field3: "ty7u6i5o4p",
    field4: "Porto Alegre",
    field5: 19.0,
    field6: 20.0,
    field7: 2.0, // dentro da margem
  },
  {
    field1: 9,
    field2: "Aparelho 09",
    field3: "gh5j4k3l2m",
    field4: "Vitória",
    field5: 20.0,
    field6: 27.0,
    field7: 3.0, // fora da margem (ALERTA)
  },
  {
    field1: 10,
    field2: "Aparelho 10",
    field3: "bn1m2q3w4e",
    field4: "Salvador",
    field5: 28.0,
    field6: 29.0,
    field7: 1.5, // dentro da margem
  },
]);
</script>

<template>
  <PageStructure title="Monitoramento">
    <div v-if="deviceList.length > 0" class="flex flex-col gap-4">
      <div class="flex items-center justify-end gap-4">
        <v-select
          multiple
          chips
          hide-details
          label="Selecione um aparelho"
          :max-width="300"
          v-model="selectedDevices"
          :items="
            deviceList.map((device) => {
              return {
                title: device.field2,
                subtitle: device.field3,
              };
            })
          "
          item-title="title"
          item-value="subtitle"
          variant="outlined"
          density="compact"
        >
        </v-select>

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
        <v-card
          v-for="(item, index) in deviceList.filter((device) =>
            selectedDevices.includes(device.field3)
          )"
          :key="index"
          rounded="sm"
        >
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
            <span
              v-if="Math.abs(item.field5 - item.field6) > item.field7"
              class="text-sm text-white"
            >
              {{
                item.field5 > item.field6
                  ? "Temperatura muito acima!"
                  : "Temperatura muito abaixo!"
              }}
            </span>
            <span
              v-else-if="item.field5 > item.field6"
              class="text-sm text-white"
            >
              Temperatura acima, mas dentro da margem!
            </span>
            <span
              v-else-if="item.field5 < item.field6"
              class="text-sm text-white"
            >
              Temperatura abaixo, porém dentro da margem!
            </span>
          </div>

          <div class="pa-4">
            <!-- <v-sheet
              border="dashed md"
              color="red-lighten-4"
              height="200"
              rounded="lg"
              width="100%"
            >
              <div class="h-[200px] flex justify-between pa-4">
                <div class="flex flex-col gap-2">
                  <h1 class="text-h5 font-weight-bold">
                    Temperatura
                    {{
                      item.field5 === item.field6
                        ? "ideal"
                        : item.field5 < item.field6
                        ? "abaixo do ideal"
                        : "acima do ideal"
                    }}
                  </h1>

                  <p v-if="item.field5 !== item.field6">
                    {{ item.field5 < item.field6 ? "Aumente" : "Diminua" }}
                    a temperatura para {{ item.field6 }}°
                  </p>
                </div>
              </div>
            </v-sheet> -->
          </div>
        </v-card>
      </div>
      <div v-else class="flex items-center justify-center h-110">
        <v-empty-state
          icon="mdi-magnify"
          text="Tente selecionar pelo menos um aparelho ou entre em contato com o seu administrador."
          title="Nada foi encontrado"
        ></v-empty-state>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-110">
      <v-empty-state
        icon="mdi-magnify"
        text="Tente filtrar novamente ou entre em contato com o seu administrador."
        title="Nada foi encontrado"
      ></v-empty-state>
    </div>
  </PageStructure>
</template>
