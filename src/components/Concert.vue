<template>
  <a @click="openBooking">
    <div v-if="start"
      class="concerts flex flex-col rounded-3xl py-1 px-[3rem] w-60 text-center justify-center ring-black ring-1">
      <p class="text-xl">{{ start.toLocaleDateString() }}</p>
      <p class="pb-10">{{ artist }}</p>
      <p class="pb-2">
        {{ start.toLocaleString() }} -
        {{ end.toLocaleString() }}
      </p>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    artist: { type: String, required: true },
    start: { type: Date, required: false },
    end: { type: Date, required: false },
    location: { type: String, required: true },
    concertId: { type: Number, required: false },
    id: { type: Number, required: false },
  },
  methods: {
    openBooking() {
      const data = {
        concertId: this.concertId,
        id: this.id,
      };
      this.$router.push({
        name: "seating",
        query: data,
      });
    },
  },
};
</script>
