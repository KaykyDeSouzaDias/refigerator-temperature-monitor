<script setup>
import { Cctv } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

const books = useState("books", () => []);
const initialValues = useState("initialValues");

const headers = ref([
  { title: "Título", key: "title", align: "start" },
  { title: "Código", key: "code" },
  { title: "Localização", key: "location" },
  { title: "Actions", key: "actions", align: "end", sortable: false },
]);

const dialog = useState("dialog", () => false);

function add() {
  initialValues.value = undefined;
  dialog.value = true;
}
function edit(id) {
  const found = books.value.find((book) => book.id === id);
  initialValues.value = { ...found };
  dialog.value = true;
}
function remove(id) {
  books.value = books.value.filter((book) => book.id !== id);
}
function save(form, isEditing) {
  if (isEditing) {
    const index = books.value.findIndex((book) => book.id === form.id);
    books.value[index] = { ...form };
  } else {
    form.id = books.value.length + 1;
    books.value.push({ ...form });
  }
  dialog.value = false;
}
</script>

<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="books.length < 11"
      :items="books"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              :icon="Cctv"
              size="x-small"
              start
            ></v-icon>

            Aparelhos
          </v-toolbar-title>

          <v-btn
            prepend-icon="mdi-plus"
            rounded="lg"
            class="text-none"
            text="Adicionar aparelho"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

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
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <DeviceForm
      :initialValues="initialValues"
      :onSubmit="save"
      :onCancel="(value) => (dialog = value)"
    />
  </v-dialog>
</template>
