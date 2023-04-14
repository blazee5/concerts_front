<template>
  <div class="concerts flex flex-col rounded-3xl py-1 px-[3rem] w-60 text-center justify-center ring-black ring-1">
    <p class="text-xl">{{ start.toLocaleDateString() }}</p>
    <p class="pb-10">{{ artist }}</p>
    <p class="pb-2">
      {{ start.toLocaleString() }} -
      {{ end.toLocaleString() }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: String, required: true },
    artist: { type: String, required: true },
    location: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
};
</script>
