<script lang='ts' setup>
import type { RouteLocationRaw } from 'vue-router';

const $props = defineProps<{
  iconName: string;
  size?: string;
  href?: string;
  to?: RouteLocationRaw;
  name: string;
  hasOverride?: boolean;
  showLabel: boolean;
}>();

const route = useRoute();
const isActive = computed(() => route.fullPath === $props.href);
</script>

<template>
  <div
    class="tooltip-right w-full flex flex-col"
    :class="{ 'tooltip': !showLabel, 'tooltip-open': hasOverride }"
    :data-tip="!showLabel ? name : null"
  >
    <NuxtLink
      :to="href || to || '#'"
      class="btn p-3"
      :class="[{ 'bg-base-300': isActive, 'justify-start': showLabel, 'justify-center': !showLabel }]"
    >
      <Icon
        :name="iconName"
        :size="size || '20'"
        :alt="iconName"
        class="min-w-7"
      />
      <transition name="grow">
        <p v-if="showLabel" class="text-ellipsis overflow-hidden whitespace-nowrap">
          {{ name }}
        </p>
      </transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}
.grow-leave-active {
  animation: grow 0.2s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
