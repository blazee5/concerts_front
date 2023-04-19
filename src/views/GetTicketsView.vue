<template>
  <Header />
  <div
    class="container mx-auto flex justify-center flex-col items-center gap-9 pt-8 pb-8"
  >
    <h1 class="text-xl">Retrive your tickets.</h1>
    <form>
      <div class="flex self-center flex-col border-2 border-black p-10">
        <label for="name">Name</label>
        <input v-model="name" class="border-2 border-black" type="text" />
        <label for="code">Code</label>
        <input v-model="code" class="border-2 border-black" type="text" />
        <button
          @click.prevent="getTickets"
          class="mt-3 self-center border-2 border-black rounded-md p-2 w-fit"
        >
          Get Ticket
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { api } from "@/api";

export default {
  data() {
    return {
      name: "",
      code: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    getTickets() {
      const data = {
        name: this.name,
        code: this.code,
      };
      api
        .post("https://apic.polytech.kz/api/v1/tickets", data)
        .then((response) => {
          this.$store.commit("setTickets", response.data.tickets);
        });
      this.$router.push("/tickets");
    },
  },
};
</script>

<style></style>
