<script setup>
const router = useRouter();
const token = useCookie("token");

const firstName = useState("first");
const lastName = useState("last");

const loading = useState("loading", () => false);

function submit(event) {
  loading.value = true;

  token.value = "3ervejfko23k23m0fdi9-k09d3iw2mf0ij2f0j30odkok20odk02";
  setTimeout(() => {
    router.push("/");
    loading.value = false;
  }, 3000);
}
</script>

<template>
  <div class="h-30 flex flex-col items-center justify-center">
    <h1 class="text-6xl font-semibold">Bem vindo</h1>
    <h3>Por favor, entre com as suas credenciais abaixo.</h3>
  </div>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="firstName"
      label="Email"
      variant="outlined"
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      label="Senha"
      variant="outlined"
    ></v-text-field>

    <div class="flex items-center justify-end">
      <v-btn
        variant="text"
        size="small"
        density="comfortable"
        color="blue-darken-4"
      >
        <p class="font-semibold">Esqueceu a senha?</p>
      </v-btn>
    </div>

    <v-btn
      class="mt-4"
      color="green-darken-2"
      :loading="loading"
      type="submit"
      block
    >
      Entrar
    </v-btn>
  </v-form>
</template>
