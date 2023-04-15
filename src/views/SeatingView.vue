<template>
  <Header />
  <h1 class="text-2xl text-center pt-5">Book seats for your show</h1>
  <div class="flex pt-3 justify-center">
    <Concert
      artist="Show"
      location="Opera"
      :start="new Date()"
      :end="new Date()"
    />
  </div>
  <div class="flex flex-row">
    <div
      class="seats ring-1 ring-black rounded-[100px] p-20 m-20 flex flex-row"
    >
      <div class="flex flex-col justify-center px-16 w-full">
        <div class="flex justify-center">
          <div
            class="ring-2 ring-green-400 p-5 bg-green-200 w-80 py-4 text-center justify-center"
          >
            <h2>Stage</h2>
          </div>
        </div>
        <div class="pt-12 flex flex-row">
          <div class="flex flex-col w-20 gap-5 text-center">
            <p>Stall 01</p>
            <p>Stall 02</p>
            <p>Stall 03</p>
            <p>Stall 04</p>
            <p>Stall 05</p>
            <p>Stall 06</p>
            <p>Terrace 01</p>
            <p>Terrace 02</p>
          </div>
          <div class="row-line flex flex-col gap-5">
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
            <div class="row-name gap-1 flex flex-row ml-20">
              <RowSeats />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ring-1 ring-black w-52 p-5 flex flex-col">
      <div class="flex flex-col">
        <div>
          <h1 class="text-lg text-center">Selected seats</h1>
        </div>
        <div class="items-end">
          <button class="ring-1 ring-black font-medium p-3 rounded-md w-40">
            Enter Booking Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Concert from "@/components/Concert.vue";
import RowSeats from "@/components/RowSeats.vue";
export default {
  components: {
    Header,
    Concert,
    RowSeats,
  },
};
</script>

<style></style>
