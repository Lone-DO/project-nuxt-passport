<script setup lang='ts' generic='T extends LatLongPin'>
import type { FetchError } from 'ofetch';
import type { RouteLocationRaw } from 'vue-router';
import type { ZodSchema } from 'zod';

import type { Field, LatLongPin, NominatimResult } from '~/lib/types';

import getFetchErrorMessage from '~/utils/get-fetch-error';

const $props = defineProps<{
  value: T;
  cancelTo: RouteLocationRaw;
  fields: Field[];
  callback: (values: T) => Promise<any>;
  submitLabel: string;
  submitIcon: string;
  schema: ZodSchema;
}>();
const $emit = defineEmits(['select', 'submit', 'submitted']);
const busy = ref(false);
const submitted = ref(false);
const submitError = ref<string | null>('');

/** Handlers */

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema($props.schema),
  /** Stage initial values to prevent form dirty during init */
  initialValues: $props.value,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = null;
    busy.value = true;
    await $props.callback(values);
    submitted.value = true;
    $emit('submitted');
  }
  catch (_error) {
    const error = _error as FetchError;
    if (error.data?.data) {
      /** Manually assign API Validation errors as Form Errors */
      setErrors(error.data?.data);
    }
    /** error.data.statusMessage is fallback for PROD captures */
    submitError.value = getFetchErrorMessage(error);
  }
  finally {
    busy.value = false;
  }
});

function onSelect(result: NominatimResult) {
  setFieldValue('name', result.display_name);
  $emit('select', result);
}

/** LifeCycle Hooks */
onBeforeRouteLeave(() => {
  /**
   * Verify user wants to leave unsaved changes
   * TODO: Create Confirmation modal, instead of using window alert
   */
  if (submitted.value || !meta.value.dirty) {
    return true;
  }
  // eslint-disable-next-line no-alert
  return window.confirm('Are you sure you want to leave? All unsaved changes will be lost.');
});

effect(() => {
  /** onChange via MapClient events, update form Long/Lat values */
  if ($props.value) {
    setFieldValue('long', $props.value.long);
    setFieldValue('lat', $props.value.lat);
  }
});
</script>

<template>
  <div
    v-if="submitError"
    role="alert"
    class="alert alert-error"
  >
    <span>{{ submitError }}</span>
  </div>
  <LocationForm
    :errors
    :busy
    :cancel-to
    :controlled-values
    :fields
    :submit-label
    :submit-icon
    @submit="onSubmit"
  />
  <div class="divider" />
  <LocationSearchForm @selected="onSelect" />
</template>
