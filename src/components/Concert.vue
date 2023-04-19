<template>
  <a @click="openBooking">
    <div v-if="start"
         class="concerts py-1 px-[3rem] gap-8 ring-1 ring-black rounded-lg flex flex-col w-fit text-center">
      <div>
        <p class="text-xl">{{ start.toLocaleDateString() }}</p>
        <p class="pb-10">{{ artist }}</p>
        <p>{{ location }}</p>
      </div>
      <p>{{ start.toLocaleTimeString() }}-{{ end.toLocaleTimeString() }}</p>

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
    artist: {type: String, required: true},
    start: {type: Date, required: false},
    end: {type: Date, required: false},
    location: {type: String, required: true},
    concertId: {type: Number, required: false},
    id: {type: Number, required: false},
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
