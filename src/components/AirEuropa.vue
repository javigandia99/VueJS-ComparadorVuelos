<template>
  <div class="container mt-4">
    <div class="list row">
      <div class="col-12 col-md-5 mb-4">
        <h1 id="titulo">AIR EUROPA</h1>
      </div>
      <!--TODO: Implemented Vera search to Origen and Destino -->
      <div class="col-12 col-md-6 offset-1">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por destino"
            v-model="Destino"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchDestino">Buscar</button>
            <button class="btn btn-outline-info" type="button" @click="refreshList">Reset List</button>
          </div>
        </div>
      </div>
      <!--TODO: Implemented Vera search to Origen and Destino -->

      <b-card-group deck>
        <b-card
          v-for="(vuelo, index) in vuelos"
          :key="index"
          img-top
          tag="article"
          style="max-width: 50rem;"
        >
          <b-card-img
            v-bind:src="vuelo.Image"
            v-bind:alt="vuelo.IdVuelo"
            class="rounded-0 card_image"
          ></b-card-img>
          <b-card-title>{{vuelo.Origen + " a " +vuelo.Destino}}</b-card-title>
          <b-card-text>{{vuelo.Fecha}}</b-card-text>
          <b-card-text class="card_precio">{{vuelo.Precio +" €"}}</b-card-text>
          <b-button
            v-b-modal.modal-center
            :class="{ active: index == currentIndex }"
            @click="setActiveVuelo(vuelo, index)"
          >Ver Detalles</b-button>
        </b-card>
      </b-card-group>

      <!-- Detail Vuelos when selected one  -->
      <b-modal
        v-if="currentVuelo"
        id="modal-center"
        centered
        :title="currentVuelo.Origen +' - '+currentVuelo.Destino"
      >
        <div class="p-4" id="vuelo">
          <div class="col-6">
            <div>
              <label>
                <strong>idVuelo:</strong>
              </label>
              {{ currentVuelo.IdVuelo }}
            </div>
            <div>
              <label>
                <strong>Origen:</strong>
              </label>
              {{ currentVuelo.Origen }}
            </div>
            <div>
              <label>
                <strong>Destino:</strong>
              </label>
              {{ currentVuelo.Destino }}
            </div>
            <div>
              <label>
                <strong>Precio:</strong>
              </label>
              {{ currentVuelo.Precio+" €" }}
            </div>
            <div>
              <label>
                <strong>Fecha:</strong>
              </label>
              {{ currentVuelo.Fecha }}
            </div>
            <div>
              <label>
                <strong>Hora:</strong>
              </label>
              {{ currentVuelo.Hora }}
            </div>
            <div>
              <label>
                <strong>Plazas Disponibles:</strong>
              </label>
              {{ currentVuelo.plazas }}
            </div>
          </div>
          <div class="col-6">
            <img v-bind:src="currentVuelo.image" fluid alt="Imagen de vuelo" />
          </div>
          <b-button
            class="btn btn-outline-warning btn-block"
            type="button"
            @click="bookingVuelo"
          >Ir a reservar plaza de vuelo</b-button>
          
        </div>
      </b-modal>
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
      currentIndex: -1,
      Destino: ""
    };
  },
  methods: {
    getALL() {
      DataService.getAllAirEuropa()
        .then(response => {
          this.vuelos = response.data;
        })
        .catch(e => {
          print(e);
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
    searchDestino() {
      DataService.findByDestinoAirEuropa(this.destino).then(response => {
        this.vuelos = response.data;
      });
      // .catch(e => {
      //   print(e);
      // });
    },
    bookingVuelo() {
      DataService.updateAirEuropa().then(response => {
        print(response.data);
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

.card_image {
  width: 4em;
  height: 6em;
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