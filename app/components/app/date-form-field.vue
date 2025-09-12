<script lang='ts' setup>
const $props = defineProps<{
  label: string;
  name: string;
  value?: number;
  error?: string;
  disabled?: boolean;
}>();

const { handleBlur, value: inputValue, handleChange } = useField<number>($props.name, {
  initialValue: Number.isNaN($props.value) ? 0 : $props.value,
});

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  handleChange(new Date(target.value).getTime());
}
</script>

<template>
  <fieldset class="app-form-field fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <input
      :disabled
      :name
      type="date"
      class="w-full"
      :value="formatDate(inputValue)"
      :class="{ 'input-error': error }"
      @change="onChange"
      @blur="handleBlur"
    >
    <p v-if="error" class="fieldset-label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
