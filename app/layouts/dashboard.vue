<script setup>
import { Menu, X, Cctv, ChartLine } from "lucide-vue-next";

const router = useRouter();

const drawer = useState("drawerOpened", () => true);
const items = ref([
  {
    id: 1,
    title: "Monitoramento",
    prependIcon: ChartLine,
    page: "/",
  },
  {
    id: 2,
    title: "Aparelhos",
    prependIcon: Cctv,
    page: "/aparelhos",
  },
]);
const selected = ref([router.currentRoute.value.fullPath]);
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer">
      <v-list density="comfortable" v-model:selected="selected" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          color="green"
          :value="item.page"
          @click="async () => await navigateTo(item.page)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.prependIcon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar border="b" class="ps-4" flat>
      <div class="flex items-center gap-2">
        <v-icon-btn @click="drawer = !drawer">
          <Menu v-if="!drawer" :size="22" />
          <X v-else :size="22" />
        </v-icon-btn>
      </div>

      <template #append>
        <v-btn class="text-none me-2" height="48" icon slim>
          <v-avatar
            color="surface-light"
            image="https://cdn.vuetifyjs.com/images/john.png"
            size="32"
          />

          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item
                append-icon="mdi-cog-outline"
                link
                title="Settings"
              />

              <v-list-item append-icon="mdi-logout" link title="Logout" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <div class="pa-4">
        <slot />
      </div>
    </v-main>
  </v-layout>
</template>
