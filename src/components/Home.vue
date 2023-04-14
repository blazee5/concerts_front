<template>
  <div class="container mx-auto flex flex-col justify-center lg:max-w-[1024px]">
    <h1 class="text-center text-3xl p-5">
      Checkout these amazing concerts in Graz.
    </h1>
    <div class="justify-center gap-2 flex text-gray-500 py-10 flex-wrap">
      <select v-model="artist" name="" id="" class="pr-14 pl-2 py-2 rounded-md">
        <option value="" selected>Artist</option>
        <option v-for="artist in allArtists" :key="artist" :value="artist">
          {{ artist }}
        </option>
      </select>
      <select v-model="location" name="" id="" class="pr-14 pl-2 py-2 rounded-md">
        <option value="" selected>Location</option>
        <option v-for="location in allLocations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
      <div class="pr-14 pl-2 py-2 rounded-md">
        <input v-model="date" type="date" class="form-control" id="exampleFormControlInput1" />
      </div>
    </div>
    <div class="flex flex-row flex-wrap gap-4">
      <Concert v-for="show in shows" :key="show.id" :id="show.id" :artist="show.artist" :location="show.location"
        :start="show.start" :end="show.end" />
    </div>
  </div>
</template>

<script>
import Concert from "@/components/Concert.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      artist: "",
      location: "",
      date: "",
      shows: [],
    };
  },
  watch: {
    artist() {
      this.shows = this.$store.getters.filteredShows(
        this.artist,
        this.location,
        this.date
      );
    },
    location() {
      this.shows = this.$store.getters.filteredShows(
        this.artist,
        this.location,
        this.date
      );
    },
    date() {
      this.shows = this.$store.getters.filteredShows(
        this.artist,
        this.location,
        this.date
      );
    },
  },
  components: {
    Concert,
  },
  computed: {
    ...mapGetters(["allShows", "allArtists", "allLocations"]),
  },
  created() {
    this.$store
      .dispatch("fetchConcerts")
      .then(
        () =>
        (this.shows = this.$store.getters.filteredShows(
          this.artist,
          this.location,
          this.date
        ))
      );
  },
};
</script>
