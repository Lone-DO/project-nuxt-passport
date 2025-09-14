<script lang='ts' setup>
import type { location } from '~/lib/db/schema';

withDefaults(defineProps<{ location: location; title?: string; description?: string }>(), {
  description: 'Deleting this location will also delete all of the associated logs',
});
const $emit = defineEmits(['accept']);
</script>

<template>
  <AppDialog>
    <template #title>
      {{ title || `Delete Location: ${location.name}` }}
    </template>
    <div>
      <p>{{ description }}</p>
      <i>This cannot be undone. Do you really want to do this?</i>
    </div>
    <template #controls="{ close }">
      <button class="btn btn-error" @click="$emit('accept')">
        Ja, Ich verstanden!
      </button>
      <button class="btn btn-neutral" @click="close">
        Cancel
      </button>
    </template>
  </AppDialog>
</template>
