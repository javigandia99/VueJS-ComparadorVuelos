import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //INDEX
    {
      path: "/",
      name: "Index",
     component: () => import("../components/Index"),
     meta: {
      title: 'Comparador de Vuelos',
    },
    },
    //AIR-EUROPA
    {
      path: "/aireuropa/vuelos/fecha/origen/",
      alias: "/aireuropa",
      name: "AirEuropa",
      component: () => import("../components/AirEuropa"),
      meta: {
        title: 'Comparador de Vuelos - AirEuropa',
      },
    },
    //IBERIA
    {
      path: "/iberia/vuelos/fecha/origen/",
      alias: "/iberia",
      name: "Iberia",
      component: () => import("../components/Iberia"),
      meta: {
        title: 'Comparador de Vuelos - Iberia',
      },
    }
  ]
});
