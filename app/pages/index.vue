<script lang='ts' setup>
const authStore = useAuthStore();
</script>

<template>
  <section id="hero-page" class="hero bg-base-200 container mx-auto mt-4 ">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Traveler's Dashboard
        </h1>
        <p class="py-6">
          Keep track of your travels and adventures with this simple passport application. Add locations, photos, and notes to create a digital journal of your journeys.
        </p>
        <AuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >
          Dashboard
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
