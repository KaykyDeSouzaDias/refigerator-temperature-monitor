<script setup lang="ts">
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Cctv,
} from "lucide-vue-next";
import type { IDevice } from "~/models";

const props = defineProps<{
  isVisible: boolean;
  viewMode: string;
  devices: IDevice[];
}>();
</script>

<template>
  <div
    v-if="props.isVisible"
    :class="
      viewMode === 'grid'
        ? 'w-full grid grid-cols-2 gap-4'
        : 'w-full flex flex-col gap-4'
    "
  >
    <v-card v-for="item in props.devices" :key="item.field3" rounded="sm">
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
            <span class="text-xs font-semibold">
              {{ parseFloat(item.field5.toString()).toFixed(2) }}°
            </span>
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
          <template v-if="Math.abs(item.field5 - item.field6) > item.field7">
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
        <slot :item="item" />
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
</template>
