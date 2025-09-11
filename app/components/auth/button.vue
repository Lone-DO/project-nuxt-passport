<script lang='ts' setup>
import type { DropdownItem } from '~/lib/types';

import { useAuthStore } from '~/stores';

const authStore = useAuthStore();
const appStore = useAppStore();

const dropdownItems: DropdownItem[] = [
  {
    icon: appStore.icons.logout,
    label: 'Sign Out',
    to: '/signout',
  },
];
</script>

<template>
  <AppDropdown
    v-if="!authStore.loading && authStore.user"
    class="auth-button dropdown-end"
    :items="dropdownItems"
    :list-classes="['w-52']"
  >
    <div class="avatar">
      <div class="mask mask-hexagon-2 w-8">
        <img :src="authStore.user.image || ''" :alt="authStore.user.name">
      </div>
    </div>
    <span>{{ authStore.user.name }}</span>
  </AppDropdown>
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
