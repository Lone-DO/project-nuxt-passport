<script lang='ts' setup>
await useAuthStore().init();
await useAppStore();
</script>

<template>
  <div id="default-layout" class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 w-full">
      <slot />
    </main>
  </div>
</template>
