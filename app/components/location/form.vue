<script lang='ts' setup>
defineProps<{
  errors: {
    name?: string;
    description?: string;
    lat?: string;
    long?: string;
  };
  busy?: boolean;
}>();

const $emit = defineEmits(['submit']);

const onSubmit = (...data: any[]) => $emit('submit', ...data);
</script>

<template>
  <form
    name="add location"
    class="flex flex-col gap-2"
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
    <AppFormField
      name="lat"
      label="Latitude"
      type="number"
      :error="errors.lat"
      :disabled="busy"
    />
    <AppFormField
      name="long"
      label="Longitude"
      type="number"
      :error="errors.long"
      :disabled="busy"
    />
    <div class="flex justify-end gap-2">
      <button
        class="btn btn-outline"
        type="button"
        :disabled="busy"
        @click="navigateTo('/dashboard')"
      >
        <Icon name="uil:arrow-left" />Cancel
      </button>
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="busy"
      >
        Add
        <span v-if="busy" class="loading loading-spinner loading-md" />
        <Icon v-else name="uil:map-marker-plus" />
      </button>
    </div>
  </form>
</template>
