<script setup lang='ts'>
const appStore = useAppStore();
const mapStore = useMapStore();
const route = useRoute();
const slug = computed(() => route.params.slug);
const { data: location, status, error, refresh } = await useFetch(`/api/locations/${slug.value}`, {
  lazy: true,
});

const busy = computed(() => status.value === 'pending');

watch(slug, async () => refresh());
watch(location, async () => {
  if (location.value) {
    mapStore.pins = [location.value];
  }
});
</script>

<template>
  <article id="dashboard-location-slug" class="flex flex-col gap-2 flex-1 max-w-md">
    <span v-if="busy" class="loading loading-spinner loading-md" />
    <span
      v-if="!busy && error"
      role="alert"
      class="alert alert-error justify-center"
    > {{ error.statusMessage }}</span>

    <template v-if="!busy && location">
      <h4 class="mb-3">
        Location: {{ location.name }}
      </h4>
      <p class="text-sm">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="text-sm">
        <i class="inline-block italic w-full">Add a location log to get started</i>
        <button class="btn btn-neutral mt-1">
          Add Location Log <Icon :name="appStore.icons.addPath" size="20" />
        </button>
      </div>
    </template>
  </article>
</template>
