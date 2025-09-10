<script lang='ts' setup>
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  cancelTo: RouteLocationRaw;
  errors: {
    name?: string;
    description?: string;
    lat?: string;
    long?: string;
  };
  submitLabel: string;
  submitIcon: string;
  controlledValues: any;
  busy?: boolean;
}>();

const $emit = defineEmits(['submit']);

const onSubmit = (...data: any[]) => $emit('submit', ...data);
</script>

<template>
  <form
    name="add location"
    class="location-form flex flex-col gap-2"
    @submit.prevent="onSubmit"
  >
    <AppFormField
      name="name"
      label="Name"
      :error="errors.name"
      :disabled="busy"
    />
    <AppFormField
      name="description"
      label="Description"
      type="textarea"
      :error="errors.description"
      :disabled="busy"
    />
    <LocationCoordinatesField :lat="controlledValues.lat" :long="controlledValues.long" />
    <div class="flex justify-end gap-2">
      <NuxtLink
        class="btn btn-outline"
        :disabled="busy || null"
        :to="cancelTo"
      >
        <Icon name="majesticons:arrow-left" />Cancel
      </NuxtLink>
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="busy"
      >
        {{ submitLabel }}
        <span v-if="busy" class="loading loading-spinner loading-md" />
        <Icon
          v-else
          :name="submitIcon"
          size="20"
        />
      </button>
    </div>
  </form>
</template>
