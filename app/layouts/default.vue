<script lang='ts' setup>
await useAuthStore().init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
  </div>
</template>
