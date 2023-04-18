<template>
  <Header />
  <h1 class="text-2xl text-center pt-5">Book seats for your show</h1>
  <div class="flex pt-3 justify-center">
    <Concert :artist="artist" :start="start" :end="end" :location="location" :concertId="concertId" :id="id" />
  </div>
  <div>
    <div class="ring-1 ring-black w-80 p-5 flex flex-col">
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-lg text-center flex flex-col gap-2">
            Selected seats
          </h1>
        </div>
        <div v-if="chosenSeats" class="self-center">
          <p v-for="seat in chosenSeats" :key="seat">
            Row: Stall {{ seat[0] }}, Seat: {{ seat[1] }}
          </p>
        </div>
        <div class="items-end self-center">
          <button @click="buySeats" class="ring-1 ring-black self-end font-medium p-3 rounded-md w-40">
            Enter Booking Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      artist: "",
      start: "",
    };
  },
  components: {
    Header,
  },
};
</script>
