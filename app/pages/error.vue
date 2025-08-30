<script lang='ts' setup>
const route = useRoute();
const error = route.query.error || 'An unknown error occurred';
</script>

<template>
  <div class="card container bg-base-300 mt-4 text-center mx-auto min-h-96 flex flex-col justify-center items-center gap-4">
    <span role="alert" class="alert alert-error min-w-1/2  justify-center">Oh Nein! {{ error }}</span>
    <NuxtLink to="/" class="btn btn-primary">
      Home <Icon name="uil:arrow-left" size="32" />
    </NuxtLink>
  </div>
</template>
