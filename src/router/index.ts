import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import NewActivity from "../views/NewActivity.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities
  },
  {
    path: "/new",
    name: "NewActivity",
    component: NewActivity
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
