<template>
<div class="container mt-4">
  <div class="list row">
    <div class="col-md-12">
      <h1>Iberia no implementado todavia.</h1>
    </div>
  </div>
</div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "iberia",
  data() {
    return {
      currentVuelo: null,
      message: ""
    };
  },
  methods: {
    getALL() {
      DataService.getAllIberia().then(response => {
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
      DataService.findByDestino(this.destino).then(response => {
        this.vuelos = response.data;
        //  print(response.data);
      });
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

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
