<template>
  <Header/>
  <Tickets></Tickets>
</template>

<script>
import Header from "@/components/Header.vue";
import Tickets from "@/components/Tickets.vue";
export default {
  components: {
    Tickets,
    Header
  }
}
</script>