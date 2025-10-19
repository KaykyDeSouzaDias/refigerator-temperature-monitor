<script setup lang="ts">
const props = defineProps<{
  selectedValues: any[];
  data: any[];
  onChangeValue: (value: any[]) => void;
}>();

const selected = useState("selected", () => props.selectedValues);

const selectAllDevices = computed(() => {
  return selected.value.length === props.data.length;
});
const selectSomeDevices = computed(() => {
  return selected.value.length > 0;
});

onMounted(() => {
  selected.value = [];
});

watch(selected, (newVal) => props.onChangeValue(newVal));

function toggle() {
  if (selectAllDevices.value) {
    selected.value = [];
  } else {
    selected.value = props.data;
  }
}
</script>

<template>
  <v-select
    clearable
    multiple
    hide-details
    label="Localização"
    variant="outlined"
    density="compact"
    :items="props.data"
    item-title="title"
    item-value="subtitle"
    v-model="selected"
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
        (+{{ selected.length - 2 }} outros)
      </span>
    </template>
  </v-select>
</template>
