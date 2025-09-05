<script setup lang='ts'>
import type { InsertLocation } from '~/lib/db/schema';

defineProps<{
  location: InsertLocation & { id: number };
}>();
</script>

<template>
  <article class="dashboard-location-item card-body">
    <h2 class="card-title">
      {{ location.name }}
    </h2>
    <p>{{ location.description || '...' }}</p>
  </article>
</template>
