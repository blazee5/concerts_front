import { api } from "@/api";
import { createStore } from "vuex";

export default createStore({
  state: {
    shows: [],
    artists: [],
    locations: [],
    chosenSeats: [],
    reservationToken: "",
    timer: 180,
    timerInterval: null,
    tickets: [],
  },
  getters: {
    getTickets(state) {
      return state.tickets;
    },
    getTimerInterval(state) {
      return state.timerInterval;
    },
    getFormattedTime(state) {
      let timer = state.timer;
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;

      if (seconds === 0) {
        seconds = "00";
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return `${minutes}:${seconds}`;
    },
    getReservationToken(state) {
      return state.reservationToken;
    },
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
    setTickets(state, payload) {
      state.tickets.push(payload);
    },
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
      if (!state.timerInterval) {
        state.timerInterval = setInterval(() => {
          this.commit("setTimer", state.timer - 1);
          if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            window.location.reload();
          }
        }, 1000);
      }
    },
    setReservationToken(state, payload) {
      if (state.reservationToken == "") {
        state.reservationToken = payload;
      }
    },
    setTimer(state, value) {
      state.timer = value;
    },
    stopTimer(state, value) {
      clearInterval(state.timerInterval);
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
