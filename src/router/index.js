import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/seating/",
    name: "seating",
    component: () => import("../views/SeatingView.vue"),
  },
  {
    path: "/booking/",
    name: "booking",
    component: () => import("@/views/BookingView.vue"),
  },
  {
    path: "/tickets/",
    name: "tickets",
    component: () => import("@/views/TicketsView.vue"),
  },
  {
    path: "/getTickets/",
    name: "getTickets",
    component: () => import("@/views/GetTicketsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
