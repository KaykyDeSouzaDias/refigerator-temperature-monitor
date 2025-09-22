<script setup lang="ts">
const props = defineProps<{
  initialValues?: any;
  onCancel: (value: boolean) => void;
  onSubmit: (value: any, isEditing: boolean) => void;
}>();

const formModel = ref<any>(createNewRecord());

watch(
  () => props.initialValues,
  (val) => {
    formModel.value = val ? { ...val } : createNewRecord();
  },
  { immediate: true }
);

const isEditing = computed(() => formModel.value.id > 0);

function createNewRecord() {
  return {
    id: 0,
    title: "",
    code: "",
    location: "",
  };
}
</script>

<template>
  <v-form @submit.prevent="props.onSubmit(toRaw(formModel), isEditing)">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formModel.title" label="Nome"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="formModel.code"
              label="Código"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="formModel.location"
              label="Localização"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn
          text="Cancelar"
          variant="plain"
          @click="props.onCancel(false)"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Salvar" type="submit"></v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
