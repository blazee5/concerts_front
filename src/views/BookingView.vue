<template>
  <Header />
  <h1 class="text-2xl text-center pt-5">Book seats for your show</h1>
  <div class="flex pt-3 justify-center">
    <Concert :artist="artist" :start="start" :end="end" :location="location" />
  </div>
  <div class="flex gap-5 p-10">
    <div class="ring-1 ring-black w-80 p-5 flex flex-col">
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-lg text-center flex flex-col gap-2">
            Selected seats
          </h1>
          <!--test-->
        </div>
        <div v-if="chosenSeats" class="self-center">
          <p v-for="item in chosenSeats" :key="item">
            Row: Stall {{ item.row }}, Seat: {{ item.seat }}
          </p>
        </div>
        <div class="self-center" v-if="chosenSeats.length > 0">
          <p>Your seats expire in {{ getFormattedTime }}</p>
        </div>
        <div class="items-end self-center">
          <button
            @click="backToSeats"
            class="ring-1 ring-black self-end font-medium p-3 rounded-md w-40"
          >
            ← Change Seats
          </button>
        </div>
      </div>
    </div>
    <form>
      <div class="ring-1 ring-black p-5">
        <h1 class="text-xl font-medium">Please enter your details</h1>
        <div class="flex flex-row">
          <div class="flex flex-col p-3">
            <label for="name">Name</label>
            <input
              v-model="name"
              type="text"
              class="border-blue-500 border-2"
            />
            <label for="address">Address</label>
            <input
              v-model="address"
              type="text"
              class="border-blue-500 border-2"
            />
            <div class="flex gap-3">
              <div class="flex flex-col">
                <label>ZIP Code</label>
                <input
                  v-model="zip"
                  type="text"
                  class="border-blue-500 border-2"
                />
              </div>
              <div class="flex flex-col">
                <label for="city">City</label>
                <input
                  v-model="city"
                  type="text"
                  class="border-blue-500 border-2"
                />
              </div>
            </div>
            <label for="country">Country</label>
            <select v-model="country" name="country" id="">
              <option
                v-for="country in countries"
                :key="country"
                value="country"
              >
                {{ country }}
              </option>
            </select>
          </div>
          <div
            class="flex flex-col border-l-2 border-black p-3 justify-between"
          >
            <div class="justify-center-center">
              <h1>
                By clicking "Book" you accept that you are not actually booking
                a ticket as this is a test project and not a real website.
              </h1>
            </div>
            <div class="flex gap-10">
              <p class="bg-gray-100 border-black border-2 p-3">
                Your ticket will be available Immediately after booking.
              </p>
              <button
                @click.prevent="bookSeats"
                class="ring-2 ring-blue-300 rounded-md px-10"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Concert from "@/components/Concert.vue";
import { mapGetters } from "vuex";
import { api } from "@/api";

export default {
  data() {
    return {
      time: 300,
      artist: "",
      start: "",
      end: "",
      location: "",
      chosenSeats: [],
      concertId: 0,
      id: 0,
      name: "",
      address: "",
      city: "",
      country: "",
      zip: 0,
      countries: [
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kazakhstan",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "North Macedonia",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United",
        "Vatican City",
      ],
    };
  },
  created() {
    this.artist = this.$route.query.artist;
    this.start = new Date(this.$route.query.start);
    this.end = new Date(this.$route.query.end);
    this.location = this.$route.query.location;
    this.chosenSeats = this.$store.getters.getChosenSeats;
    this.concertId = this.$route.query.concertId;
    this.id = this.$route.query.id;
  },
  components: {
    Header,
    Concert,
  },
  computed: {
    ...mapGetters(["getReservationToken"]),
    ...mapGetters(["getFormattedTime"]),
  },
  methods: {
	  backToSeats() {
		  this.$router.go(-1);
	  },
	  bookSeats() {
		  const data = {
			  reservation_token: this.getReservationToken,
			  name: this.name,
			  address: this.address,
			  city: this.city,
			  zip: this.zip,
			  country: this.country,
		  };
		  api.post(
			  `https://apic.polytech.kz/api/v1/concerts/${this.concertId}/shows/${this.id}/booking`,
			  data
		  ).then(response => {
			  this.$store.commit('setTickets', response.data.tickets)
		  })
		  this.$router.push("/tickets")
	  },
  },
};
</script>
