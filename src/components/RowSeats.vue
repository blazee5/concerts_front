<template>
  <div v-for="index in row.seats.total" :key="index" v-on:click="(e) => e.target.classList.toggle('bg-green-300')"
    @click="addChosenSeat(index)">
    <div class="ring-1 w-6 ring-black rounded-full cursor-pointer hover:bg-amber-300" :id="row.name + index"
      :class="{ 'bg-red-300 cursor-not-allowed': isUnavailable(index) }">
      <button></button>
    </div>
  </div>
</template>

<script>
import { api } from "@/api";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RowSeats",
  data() {
    return {
      reservationToken: "",
    };
  },
  props: {
    row: { type: Object, required: false },
    unavailable: { type: Array, required: true },
    concertId: { type: Number, required: false },
    id: { type: Number, required: false },
  },
  methods: {
    isUnavailable(index) {
      return this.unavailable.some((seat) => seat === index);
    },
    addChosenSeat(index) {
      if (this.isUnavailable(index)) {
        return;
      } else {
        const seat = {
          row: this.row.id,
          seat: index,
        };
        this.$store.commit("addChosenSeat", seat);
        const data = {
          reservations: this.getChosenSeats,
          duration: 299,
          reservation_token: this.getReservationToken,
        };
        if (!this.getReservationToken) {
          data["reservation_token"] = "";
        }
        api
          .post(
            `https://apic.polytech.kz/api/v1/concerts/${this.concertId}/shows/${this.id}/reservation`,
            data
          )
          .then((response) => {
            this.$store.commit(
              "setReservationToken",
              response.data.reservation_token
            );
          });
      }
    },
  },
  computed: {
    ...mapMutations(["stopTimer"]),
    ...mapMutations(["setReservationToken"]),
    ...mapGetters(["getReservationToken"]),
    ...mapGetters(["getChosenSeats"]),
  },
};
</script>
