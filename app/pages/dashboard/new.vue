<script lang='ts' setup>
import type { FetchError } from 'ofetch';

import { InsertLocation } from '~/lib/db/schema';

const { $csrfFetch } = useNuxtApp();

const busy = ref(false);
const submitted = ref(false);
const submitError = ref<string | null>('');
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = null;
    busy.value = true;
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    });
    submitted.value = true;
    /** TODO: After submitting, redirect user to newly created item page (/dashboard/:locationID) */
    navigateTo('/dashboard');
  }
  catch (_error) {
    const error = _error as FetchError;
    if (error.data?.data) {
      /** Manually assign API Validation errors as Form Errors */
      setErrors(error.data?.data);
    }
    /** error.data.statusMessage is fallback for PROD captures */
    submitError.value = error.data?.statusMessage || error.statusMessage || 'An unknown error occurred.';
  }
  finally {
    busy.value = false;
  }
});

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
</script>

<template>
  <article class="container max-w-md">
    <h4 class="my-4">
      Add Location
    </h4>
    <p class="text-sm">
      A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
    </p>
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
      @submit="onSubmit"
    />
  </article>
</template>
