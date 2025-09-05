<script setup lang='ts'>
import { CENTER_GERMANY } from '~/lib/constants';

const colorMode = useColorMode();
const darkMode = '/styles/dark.json';
const lightMode = 'https://tiles.openfreemap.org/styles/liberty';
const style = computed(() => colorMode.value === 'dark' ? darkMode : lightMode);
const center = CENTER_GERMANY;
const zoom = 5;
</script>

<template>
  <LazyClientOnly>
    <template #fallback>
      <div class="skeleton flex-1" />
    </template>
    <div id="map-client" class="flex-1">
      <MglMap
        :map-style="style"
        :center="center"
        :zoom="zoom"
      >
        <MglNavigationControl />
      </MglMap>
    </div>
  </LazyClientOnly>
</template>
