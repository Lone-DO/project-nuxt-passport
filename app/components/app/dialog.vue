<script lang='ts' setup>
const $props = defineProps<{
  title?: string;
  label?: string;
  isOpen: boolean;
}>();
const $emits = defineEmits(['onClosed']);
const $slots = defineSlots<{
  label?: any;
  title?: any;
  default: any;
  controls: any;
}>();

const modal = useTemplateRef('modal');
const showModal = () => modal.value?.showModal();
const closeModal = () => modal.value?.close();
watch(() => $props.isOpen, bool => bool ? showModal() : closeModal());

/** Mount Event Listeners */
const onClose = () => $emits('onClosed');
onMounted(() => {
  modal.value?.addEventListener('close', onClose);
});

onUnmounted(() => {
  modal.value?.removeEventListener('close', onClose);
  $emits('onClosed');
});
</script>

<template>
  <!-- https://daisyui.com/components/modal/#dialog-modal-with-a-close-button-at-corner -->
  <dialog
    id="app-dialog"
    ref="modal"
    class="modal"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 v-if="title || $slots.title" class="text-lg font-bold">
        <slot name="title">
          {{ title || 'insert title' }}
        </slot>
      </h3>
      <slot />
      <div class="modal-action">
        <form class="flex gap-2" @submit.prevent>
          <!-- if there is a button in form, it will close the modal -->
          <slot name="controls" v-bind="{ close: closeModal }" />
        </form>
      </div>
    </div>
  </dialog>
</template>
