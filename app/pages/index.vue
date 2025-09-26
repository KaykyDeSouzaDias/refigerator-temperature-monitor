<script setup>
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

const selectedDevices = useState("selected", () => []);
const deviceList = ref([
  {
    nome: "Aparelho 01",
    codigo: "jo9ko3d4i39krkd",
    localizacao: "Niterói",
    temperatura: 10,
    temperaturaIdeal: 5,
  },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-start">
      <v-select
        multiple
        chips
        label="Selecione um aparelho"
        :max-width="300"
        v-model="selectedDevices"
        :items="
          deviceList.map((device) => {
            return {
              title: device.nome,
              subtitle: device.codigo,
            };
          })
        "
        item-title="title"
        item-value="subtitle"
        variant="outlined"
      >
      </v-select>
    </div>

    <div class="w-full flex gap-4">
      <v-card
        v-for="(item, index) in deviceList.filter((device) =>
          selectedDevices.includes(device.codigo)
        )"
        :key="index"
        class="w-[50%]"
        rounded="lg"
      >
        <v-card-item>
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <v-card-title>{{ item.nome }}</v-card-title>
              <v-card-subtitle>{{ item.codigo }}</v-card-subtitle>
            </div>

            <v-chip :text="item.localizacao"></v-chip>
          </div>
        </v-card-item>

        <v-divider />

        <div class="pa-4">
          <v-sheet
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
                    item.temperatura === item.temperaturaIdeal
                      ? "ideal"
                      : item.temperatura < item.temperaturaIdeal
                      ? "abaixo do ideal"
                      : "acima do ideal"
                  }}
                </h1>

                <p v-if="item.temperatura !== item.temperaturaIdeal">
                  {{
                    item.temperatura < item.temperaturaIdeal
                      ? "Aumente"
                      : "Diminua"
                  }}
                  a temperatura para {{ item.temperaturaIdeal }}°
                </p>
              </div>
              <div class="flex gap-2">
                <Thermometer
                  v-if="item.temperatura === item.temperaturaIdeal"
                  :size="50"
                />
                <ThermometerSnowflake
                  v-else-if="item.temperatura < item.temperaturaIdeal"
                  :size="50"
                />
                <ThermometerSun v-else :size="50" />

                <h1 class="text-6xl font-semibold">{{ item.temperatura }}°</h1>
              </div>
            </div>
          </v-sheet>
        </div>
      </v-card>
    </div>
  </div>
</template>
