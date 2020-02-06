<template src='./AirEuropa.html' lang='html'>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "AirEuropa",
  data() {
    return {
      vuelos: [],
      currentVuelo: null,
      currentIndex: -1,
      destino: ""
    };
  },
  methods: {
    getALL() {
      DataService.getAllAirEuropa().then(response => {
        this.vuelos = response.data;
      });
      // .catch(e => {
      //   print(e);
      // });
    },
    refreshList() {
      this.getALL();
      this.currentVuelo = null;
      this.currentIndex = -1;
    },
    setActiveVuelo(vuelo, index) {
      this.currentVuelo = vuelo;
      this.currentIndex = index;
    },
    searchDestino() {
      DataService.findByDestinoAirEuropa(this.destino).then(response => {
        this.vuelos = response.data;
      });
      // .catch(e => {
      //   print(e);
      // });
    },
    BookingVuelo() {
      DataService.updateAirEuropa().then(response => {
        response.data;
      });
    }
  },
  mounted() {
    this.getALL();
  }
};
</script>
<style>
.list {
  text-align: left;
  margin: auto;
}
#titulo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
#card {
  background-color: rgb(52, 58, 64);
  border-radius: 3em;
}
#vuelo {
  background-color: white;
  border-radius: 3em;
}
#notvuelo {
  color: white;
}
</style>