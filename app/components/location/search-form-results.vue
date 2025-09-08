<script setup lang='ts'>
import type { NominatimResult } from '~/lib/types';

defineProps<{
  results: NominatimResult[];
}>();
defineEmits(['select']);

const appStore = useAppStore();
</script>

<template>
  <ul class="flex flex-col overflow-auto gap-2 max-h-60 mt-2 w-full">
    <li
      v-for="item in results"
      :key="item.place_id"
      class="card bg-base-300 card-xs shadow-sm "
    >
      <article class="card-body">
        <h4 class="card-title">
          {{ item.display_name }}
        </h4>
        <div class="justify-end card-actions">
          <button class="btn btn-warning btn-sm" @click="$emit('select', item)">
            Set Location
            <Icon :name="appStore.icons.searchPin" size="20" />
          </button>
        </div>
      </article>
    </li>
  </ul>
</template>
