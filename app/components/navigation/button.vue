<script lang='ts' setup>
const $props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: '24' },
  href: { type: String, required: true },
  label: { type: String, default: null },
  hasOverride: { type: Boolean, default: false },
  showLabel: { type: Boolean, default: true },
});

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
      :to="$props.href"
      class="btn flex-nowrap w-full"
      :class="[{ 'bg-base-300': isActive, 'justify-start': showLabel, 'justify-center': !showLabel }]"
    >
      <Icon
        :name="$props.name"
        :size="$props.size"
        :alt="$props.name"
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
