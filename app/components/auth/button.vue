<script lang='ts' setup>
import { useAuthStore } from '~/stores';

const authStore = useAuthStore();
const appStore = useAppStore();
</script>

<template>
  <details v-if="!authStore.loading && authStore.user" class="auth-button dropdown dropdown-end">
    <summary class="btn m-1">
      <div class="avatar">
        <div class="mask mask-hexagon-2 w-8">
          <img :src="authStore.user.image || ''" :alt="authStore.user.name">
        </div>
      </div>
      <span>{{ authStore.user.name }}</span>
    </summary>
    <ul class="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/signout">
          <Icon
            size="20"
            class="text-(--btn-fg)"
            :name="appStore.icons.logout"
          />
          <span class="text-(--btn-fg)">Sign Out</span>
        </NuxtLink>
      </li>
    </ul>
  </details>
  <button
    v-else
    :disabled="authStore.loading"
    class="auth-button btn btn-accent"
    @click="authStore.signIn"
  >
    Sign in with GitHub
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon
      v-else
      name="fa-brands:github-square"
      size="32"
    />
  </button>
</template>
