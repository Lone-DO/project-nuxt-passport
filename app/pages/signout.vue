<script lang='ts' setup>
const authStore = useAuthStore();

onMounted(authStore.signOut);
</script>

<template>
  <div class="card container bg-base-300 mt-4 text-center mx-auto min-h-96 flex flex-col justify-center items-center gap-4">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
