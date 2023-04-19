<template>
  <div class="header flex justify-around bg-indigo-500 gap-10 text-white p-5 flex-wrap items-center">
    <button @click="goHome">EuroSkills Concerts</button>
    <div class="flex flex-row flex-wrap justify-center gap-2 items-center">
      <p>Already booked?</p>
      <button @click="this.$router.push('/getTickets')" class="bg-white text-black rounded-xl px-2 py-2">
        Get Tickets
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
