import { api } from "@/api";
import { createStore } from "vuex";

export default createStore({
  state: {
    shows: [],
    artists: [],
    locations: [],
    chosenSeats: [],
  },
  getters: {
    getChosenSeats(state) {
      return state.chosenSeats;
    },
    allShows(state) {
      return state.shows;
    },
    allArtists(state) {
      return state.artists;
    },
    allLocations(state) {
      return state.locations;
    },
    filteredShows: (state) => (artist, location, date) => {
      let shows = state.shows;
      if (artist) {
        shows = shows.filter((show) => show.artist === artist);
      }
      if (location) {
        shows = shows.filter((show) => show.location === location);
      }
      if (date) {
        shows = shows.filter(
          (show) =>
            new Date(date).toLocaleDateString() ===
            show.start.toLocaleDateString()
        );
      }
      return shows;
    },
  },
  mutations: {
    setShows(state, payload) {
      state.shows = payload;
    },
    setArtists(state, payload) {
      state.artists = payload;
    },
    setLocations(state, payload) {
      state.locations = payload;
    },
    addChosenSeat(state, seat) {
      const index = state.chosenSeats.indexOf(seat);
      if (index === -1) {
        state.chosenSeats.push(seat);
      } else {
        state.chosenSeats.splice(index, 1);
      }
    },
  },
  actions: {
    async fetchConcerts({ commit, state }) {
      const response = await api.get("concerts");
      const shows = response.data.concerts
        .map((concert) => {
          return concert.shows.map((show) => {
            return {
              id: show.id,
              artist: concert.artist,
              location: concert.location.name,
              start: new Date(show.start),
              end: new Date(show.end),
              concertId: concert.id,
            };
          });
        })
        .flat();
      commit("setShows", shows);
      commit("setArtists", [...new Set(shows.map((show) => show.artist))]);
      commit("setLocations", [...new Set(shows.map((show) => show.location))]);
    },
  },
  modules: {},
});
