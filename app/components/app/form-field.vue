<script lang='ts' setup>
defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: 'number' | 'text' | 'textarea';
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="app-form-field fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :disabled
      :name
      :as="type === 'textarea' ? type : 'input'"
      :type="type || 'text'"
      class="w-full"
      :class="{
        'input-error': error,
        'input': !type || ['text', 'number'].includes(type),
        'textarea': type === 'textarea',

      }"
    />
    <p v-if="error" class="fieldset-label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
