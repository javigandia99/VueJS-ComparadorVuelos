import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //AIR-EUROPA
    {
      path: "aireuropa/vuelos/fecha/origen/",
      alias: "/aireuropa",
      name: "AirEuropa",
      component: () => import("../components/AirEuropa")
    },
    {
      path: "iberia/vuelos/fecha/origen/",
      alias: "/iberia",
      name: "detailAirEuropa",
      component: () => import("../components/Iberia")
    }
  ]
});
