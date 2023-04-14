<template>
  <Header />
  <h1 class="text-2xl text-center pt-5">Book seats for your show</h1>
  <div class="flex pt-3 justify-center">
    <Concert artist="Show" location="Opera" :start="new Date()" :end="new Date()" />
  </div>
  <div class="seats ring-1 ring-black rounded-xl p-20 m-20 flex flex-row">
    <div class="flex flex-col justify-center px-16 w-max">
      <div class="ring-2 ring-green-400 p-5 bg-green-200 w-64 py-4 text-center flex flex-col justify-center">
        <h2>Stage</h2>
      </div>
      <div class="">
        <div class="row-line flex flex-col gap-5">
          <div class="row-name">
            <p>Stall 01</p>
          </div>
          <div class="row-seat">
            <p>Stall 02</p>
          </div>
          <div class="row-seat row-seat--selected">
            <p>Stall 03</p>
          </div>
          <div class="row-seat">
            <p>Stall 04</p>
          </div>
          <div class="row-seat">
            <p>Stall 05</p>
          </div>
          <div class="row-seat">
            <p>Stall 06</p>
          </div>
          <div class="row-seat row-seat-reserved">
            <p>Terrace 01</p>
          </div>
          <div class="row-seat">
            <p>Terrace 02</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ring-1 ring-black w-52 p-5">
      <h1 class="text-lg text-center">Selected seats</h1>
      <button class="ring-1 ring-black mt-20 font-medium p-3 rounded-md w-40">
        Enter Booking Details
      </button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Concert from "@/components/Concert.vue";
export default {
  components: {
    Header,
    Concert,
  },
};
</script>

<style></style>
