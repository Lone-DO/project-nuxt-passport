<script lang='ts' setup>
defineProps<{
  errors: {
    name?: string;
    description?: string;
    lat?: string;
    long?: string;
  };
  controlledValues: any;
  busy?: boolean;
}>();

const $emit = defineEmits(['submit']);

const onSubmit = (...data: any[]) => $emit('submit', ...data);

const appStore = useAppStore();
const { icons } = storeToRefs(appStore);
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
      <button
        class="btn btn-outline"
        type="button"
        :disabled="busy"
        @click="navigateTo('/dashboard')"
      >
        <Icon name="majesticons:arrow-left" />Cancel
      </button>
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="busy"
      >
        Add
        <span v-if="busy" class="loading loading-spinner loading-md" />
        <Icon
          v-else
          :name="icons.add"
          size="20"
        />
      </button>
    </div>
  </form>
</template>
