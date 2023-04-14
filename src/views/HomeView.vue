<template>
  <div class="home">
    <Header />
    <Home />
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",
  components: {
    Home,
    Header,
  },
};
</script>
