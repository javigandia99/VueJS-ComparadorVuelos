import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //INDEX
    {
      path: "/",
      alias: "/",
      name: "Index",
      component: () => import("../components/Index")
    },
    //AIR-EUROPA
    {
      path: "/aireuropa/vuelos/fecha/origen/",
      alias: "/aireuropa",
      name: "AirEuropa",
      component: () => import("../components/AirEuropa")
    },
    //IBERIA
    {
      path: "/iberia/vuelos/fecha/origen/",
      alias: "/iberia",
      name: "Iberia",
      component: () => import("../components/Iberia")
    }
  ]
});
