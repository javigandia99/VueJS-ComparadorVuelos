<template>
  <div class="container mt-4">
    <div class="list row">
      <div class="col-12 col-md-12 mb-4">
        <img class="img_logo" src="../assets/iberia.png" />
      </div>

<!--TOODO:Implement Iberia view  -->

      <div class="col-12 mt-5">
        <h3>Ahora mismo no hay vuelos disponibles. Disculpen las molestias</h3>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "AirEuropa",
  data() {
    return {
      vuelos: [],
      currentVuelo: null,
      currentIndex: -1
    };
  },
  methods: {
    getALL() {
      DataService.getAllIberia()
        .then(response => {
          this.vuelos = response.data;
        })
        .catch(e => {
          e.response;
        });
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

    getOrigenItem(origenSelected) {
      DataService.findByOrigenIberia(origenSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    getDestinoItem(origenSelected) {
      DataService.findByDestinoIberia(origenSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    bookingVuelo() {
      DataService.updateIberia();
      this.refreshList();
    }
  },
  mounted() {
    this.getALL();
  }
};
</script>
<style>
.list {
  text-align: center;
  margin: auto;
  background-color: white;
}
.img_logo {
  width: 40em;
  margin: auto;
  text-align: center;
}
.card {
  max-width: 40em;
}
.card_title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 1em;
  height: 3em;
  font-size: 1.5em;
}

.card_image {
  width: 20em;
  height: 11em;
}
.card_precio {
  font-size: 2.5em;
  text-align: right;
}
#vuelo {
  background-color: white;
  border-radius: 3em;
}
#notvuelo {
  color: white;
}
#card {
  background-color: rgb(52, 58, 64);
  border-radius: 3em;
}
</style>