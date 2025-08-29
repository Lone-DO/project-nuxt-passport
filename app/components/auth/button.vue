<script lang='ts' setup>
import { useAuthStore } from '~/stores';

const authStore = useAuthStore();
</script>

<template>
  <button
    :disabled="authStore.loading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    Sign in with GitHub
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon
      v-else
      name="uil:github"
      size="32"
    />
  </button>
</template>
