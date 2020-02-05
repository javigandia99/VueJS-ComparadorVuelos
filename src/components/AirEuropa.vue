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
      DataService.getAll()
        .then(response => {
          this.vuelos = response.data;
        })
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
      DataService.findByDestino(this.destino)
        .then(response => {
          this.vuelos = response.data;
        //  print(response.data);
        })
        // .catch(e => {
        //   print(e);
        // });
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
  max-width: 750px;
  margin: auto;
}
</style>