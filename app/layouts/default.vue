<script lang='ts' setup>
await useAuthStore().init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
