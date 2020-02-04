import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
      //AIR-EUROPA
    {
      path: "/",
      alias: "/vuelos/fecha/origen/",
      name: "vuelos",
      component: () => import("./components/AirEuropa")
    }
  ]
});
