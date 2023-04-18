<template>
  <div v-for="index in row.seats.total" :key="index" @click="addChoseSeat(index)">
    <div class="ring-1 w-6 hover:bg-green-300 ring-black rounded-full" :id="row.name + index"
      :class="{ 'bg-red-300': isUnavailable(index) }">
      <button></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RowSeats",
  props: {
    row: { type: Object, required: false },
    unavailable: { type: Array, required: true },
  },
  methods: {
    isUnavailable(index) {
      return this.unavailable.some((seat) => seat === index);
    },
    addChoseSeat(index) {
      if (this.isUnavailable(index)) {
        return;
      } else {
        const seat = this.row.name + index;
        this.$store.commit("addChosenSeat", seat);
      }
    },
  },
};
</script>
