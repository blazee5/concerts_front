<template>
	<div class="container mx-auto flex justify-center flex-col items-center gap-9 pt-8 pb-8">
		<h1 v-if="tickets.length > 0" class="text-3xl">Your tickets are ready!</h1>
		<h1 class="text-3xl" v-else>You don't ave any tickets.</h1>

		<div v-if="tickets.length > 0" class="flex flex-col gap-3 ring-1 ring-black w-[300px] py-2 px-3">
			<h1>Your Details</h1>
			<div class="flex flex-row justify-between">
				<p>Name</p>
				<p>{{ tickets[0][0]["name"] }}</p>
			</div>
			<div class="flex flex-row justify-between">
				<p>Booked On</p>
				<p>{{ new Date(tickets[0][0]["created_at"]).toLocaleDateString() }}</p>
			</div>
		</div>
		<div v-if="tickets.length > 0" class="flex flex-row gap-16">
			<div v-for="ticket in tickets[0]" :key="ticket"
				class="ring-1 ring-black flex flex-col py-3 px-9 text-center gap-3 items-center">
				<h2 class="text-2xl font-semibold">Ticket</h2>
				<p>Row: {{ ticket["row"]["name"] }}</p>
				<p>Seat: {{ ticket["seat"] }}</p>

				<p class="ring-1 ring-black py-1 px-2 text-center rounded-md">
					Code: {{ ticket["code"] }}
				</p>
				<div class="flex flex-col gap-2 py-1 px-2 ring-1 ring-black rounded-lg w-full">
					<p>Date</p>
					<p class="font-semibold text-2xl">
						{{ ticket["show"]["concert"]["artist"] }}
					</p>
					<p class="pb-16">
						{{ ticket["show"]["concert"]["location"]["name"] }}
					</p>
					<p>
						{{ new Date(ticket.show.start).toLocaleDateString() }} -
						{{ new Date(ticket.show.end).toLocaleDateString() }}
					</p>
				</div>
				<button @click="cancelTicket(ticket)"
					class="ring-1 ring-black py-1 px-2 text-center rounded-md w-fit cursor-pointer hover:bg-red-200">
					<p>Cancel ticket</p>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "@/api";

export default {
	name: "Tickets",
	data() {
		return {
			name: "",
			bookedOn: "",
			tickets: [],
		};
	},
	created() {
		this.tickets = this.getTickets;
	},
	methods: {
		cancelTicket(ticket) {
			api.post(
				`https://apic.polytech.kz/api/v1/tickets/${ticket["id"]}/cancel`,
				{
					code: ticket["code"],
					name: ticket["name"],
				}
			);
		},
	},
	computed: {
		...mapGetters(["getTickets"]),
	},
};
</script>
