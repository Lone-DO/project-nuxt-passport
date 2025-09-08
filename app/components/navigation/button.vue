<script lang='ts' setup>
import type { RouteLocationRaw } from 'vue-router';

const $props = defineProps<{
  name: string;
  size?: string;
  href?: string;
  to?: RouteLocationRaw;
  label: string;
  hasOverride?: boolean;
  showLabel: boolean;
}>();

const route = useRoute();
const isActive = computed(() => route.fullPath === $props.href);
</script>

<template>
  <div
    class="tooltip-right w-full"
    :class="{ 'tooltip': !showLabel, 'tooltip-open': hasOverride }"
    :data-tip="!showLabel ? label : null"
  >
    <NuxtLink
      :to="href || to || '#'"
      class="btn flex-nowrap w-full"
      :class="[{ 'bg-base-300': isActive, 'justify-start': showLabel, 'justify-center': !showLabel }]"
    >
      <Icon
        :name="name"
        :size="size || '24'"
        :alt="name"
      />
      <transition name="grow">
        <span v-if="showLabel" class="text-nowrap">
          <slot><span>{{ label }}</span></slot>
        </span>
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
