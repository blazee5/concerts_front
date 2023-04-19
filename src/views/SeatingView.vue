<template>
  <Header />
  <h1 class="text-2xl text-center pt-5">Book seats for your show</h1>
  <div class="flex pt-3 justify-center">
    <Concert
      :artist="artist"
      :start="start"
      :end="end"
      :location="location"
      :concertId="concertId"
      :id="id"
    />
  </div>
  <div class="flex flex-row m-20 gap-10 flex-wrap">
    <div class="seats ring-1 ring-black rounded-lg w-[70%] p-20 flex flex-row">
      <div class="flex flex-col justify-center w-full">
        <div class="flex justify-center">
          <div
            class="ring-2 ring-green-400 p-5 bg-green-200 w-80 py-4 text-center justify-center"
          >
            <h2>Stage</h2>
          </div>
        </div>
        <div class="pt-12 flex flex-row">
          <div class="flex flex-col w-20 gap-5 text-center">
            <p v-for="letter in rows" :key="letter">Stall {{ letter.name }}</p>
          </div>
          <div class="row-line flex flex-col gap-5">
            <div
              v-for="row in rows"
              :key="row"
              class="row-name gap-1.5 flex flex-row ml-20"
            >
              <RowSeats
                :row="row"
                :unavailable="row.seats.unavailable"
                :concertId="concertId"
                :id="id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ring-1 ring-black w-80 p-5 flex flex-col rounded-lg">
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-lg text-center flex flex-col gap-2">
            Selected seats
          </h1>
        </div>
        <div v-if="chosenSeats" class="self-center">
          <p v-for="item in chosenSeats" :key="item">
            Row: Stall {{ item.row }}, Seat: {{ item.seat }}
          </p>
        </div>
        <div class="items-end self-center">
          <button
            @click="buySeats"
            class="ring-1 ring-black self-end font-medium p-3 rounded-md w-40"
          >
            Enter Booking Details
          </button>
        </div>
        <div class="self-center" v-if="chosenSeats.length > 0">
          <p>Your seats expire in {{ getFormattedTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Concert from "@/components/Concert.vue";
import RowSeats from "@/components/RowSeats.vue";
import { api } from "@/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      concertId: 0,
      artist: "",
      location: "",
      start: null,
      end: null,
      id: 0,
      rows: [],
      chosenSeats: [],
    };
  },
  components: {
    Header,
    Concert,
    RowSeats,
  },
  async created() {
    this.id = parseInt(this.$route.query.id);
    this.concertId = parseInt(this.$route.query.concertId);
    this.chosenSeats = this.$store.getters.getChosenSeats;
    await this.fetchSeats();
    await this.fetchConcert();
  },
  methods: {
    async fetchSeats() {
      const response = await api.get(
        `concerts/${this.concertId}/shows/${this.id}/seating`
      );
      this.rows = response.data.rows;
    },
    async fetchConcert() {
      const response = await api.get(`concerts/${this.concertId}`);
      this.start = new Date(response.data.concert.shows[0].start);
      this.end = new Date(response.data.concert.shows[0].end);
      this.artist = response.data.concert.artist;
      this.location = response.data.concert.location.name;
      this.loading = true;
    },
    buySeats() {
      const data = {
        concertId: this.concertId,
        id: this.id,
        artist: this.artist,
        location: this.location,
        start: this.start,
        end: this.end,
      };
      this.$router.push({
        name: "booking",
        query: data,
      });
    },
  },
  computed: {
    ...mapGetters(["getFormattedTime"]),
    ...mapGetters(["getChosenSeats"]),
  },
};
</script>
