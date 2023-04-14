<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchConcerts");
  },
};
</script>

<style></style>
