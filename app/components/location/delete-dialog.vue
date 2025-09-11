<script lang='ts' setup>
import type { location } from '~/lib/db/schema';

defineProps<{ location: location }>();
const $emit = defineEmits(['accept']);
</script>

<template>
  <AppDialog>
    <template #title>
      Delete Location: {{ location.name }}
    </template>
    <div>
      <p>Deleting this location will also delete all of the associated logs</p>
      <i>This cannot be undone. Do you really want to do this?</i>
    </div>
    <template #controls>
      <button class="btn btn-error" @click="$emit('accept')">
        Ja, Ich verstanden!
      </button>
      <button class="btn btn-neutral">
        Cancel
      </button>
    </template>
  </AppDialog>
</template>
