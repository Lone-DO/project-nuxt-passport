<script lang='ts' setup>
import type { FetchError } from 'ofetch';

import type { NominatimResult } from '~/lib/types';

import { SearchSchema } from '~/lib/zod-schemas';
import getFetchErrorMessage from '~/utils/get-fetch-error';

import SearchFormResults from './search-form-results.vue';

const $emit = defineEmits<{
  selected: [result: NominatimResult];
}>();
const appStore = useAppStore();

const results = ref<NominatimResult[]>([]);
const form = useTemplateRef('form');
const busy = ref(false);
const hasSearched = ref(false);
const errorMessage = ref('');

async function reset() {
  results.value = [];
  errorMessage.value = '';
  hasSearched.value = false;
  return null;
}

async function onSubmit(query: Record<string, string>) {
  try {
    await reset();
    busy.value = true;
    hasSearched.value = true;
    const data = await $fetch('/api/search', {
      query,
    });
    results.value = data;
  }
  catch (e: any) {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
  }
  finally {
    busy.value = false;
  }
}

async function updateLocation(result: NominatimResult) {
  $emit('selected', result);
  await reset();
  if (form.value) {
    form.value.resetForm();
  }
}
</script>

<template>
  <Form
    id="location-search-form"
    ref="form"
    v-slot="{ errors }"
    class="flex flex-col gap-2 items-center"
    :validation-schema="toTypedSchema(SearchSchema)"
    :initial-values="{ q: '' }"
    @submit="onSubmit"
  >
    <fieldset class="join w-full">
      <label class="input join-item w-full" :class="{ 'input-error': errors.q }">
        <Icon :name="appStore.icons.search" size="20" />
        <Field
          type="text"
          name="q"
          placeholder="Search for a location"
          :disabled="busy"
        />
      </label>
      <button class="btn btn-neutral join-item" :disabled="busy">
        Search
      </button>
    </fieldset>
    <p v-if="errors.q" class="text-error">
      {{ errors?.q }}
    </p>
    <div v-if="busy" class="flex justify-center">
      <div class="loading loading-lg" />
    </div>
    <template v-else>
      <p
        v-if="errorMessage"
        role="alert"
        class="alert alert-error"
      >
        {{ errorMessage }}
      </p>
      <p
        v-if="hasSearched && !results.length"
        role="alert"
        class="alert alert-warning"
      >
        No results found.
      </p>
    </template>
    <SearchFormResults
      :results
      @select="updateLocation"
    />
  </Form>
</template>
