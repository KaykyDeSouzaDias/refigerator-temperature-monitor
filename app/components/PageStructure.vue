<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="h-[80px] flex items-center">
      <h1 class="font-[Inter] font-semibold text-5xl">{{ props.title }}</h1>
    </div>

    <slot />
  </div>
</template>
