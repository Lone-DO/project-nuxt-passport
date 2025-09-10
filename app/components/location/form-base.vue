<script setup lang='ts'>
import type { FetchError } from 'ofetch';

import type { NominatimResult } from '~/lib/types';

import { InsertLocation } from '~/lib/db/schema';
import getFetchErrorMessage from '~/utils/get-fetch-error';

const $props = defineProps<{
  location: InsertLocation;
  callback: (values: InsertLocation) => Promise<any>;
}>();
const $emit = defineEmits(['select', 'submit', 'submitted']);
const busy = ref(false);
const submitted = ref(false);
const submitError = ref<string | null>('');

/** Handlers */

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  /** Stage initial values to prevent form dirty during init */
  initialValues: $props.location,
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
  if ($props.location) {
    setFieldValue('long', $props.location.long);
    setFieldValue('lat', $props.location.lat);
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
    :controlled-values
    @submit="onSubmit"
  />
  <div class="divider" />
  <LocationSearchForm @selected="onSelect" />
</template>
