<template>
  <div class="container mt-4">
    <div class="list row">
      <div class="col-12 col-md-12 mb-4">
        <img class="img_logo" src="../assets/air-europa.png" />
      </div>
      <!--TODO: Implemented Vera search to Origen and Destino -->
      <!--
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
      -->
      <!--Origen Selector to search-->

      <div class="col-6">
        <b-form-select v-model="selected" class="mb-3">
          <b-form-select-option :value="null" disabled>Filtrar por origen</b-form-select-option>
          <b-form-select-option
            v-for="(vuelo, index) in vuelos"
            :key="index"
            :value="vuelo.origen"
            @change="getOrigenItem(currentIndex)"
          >{{vuelo.origen}}</b-form-select-option>
        </b-form-select>
      </div>

      <!--Destino Selector to search -->
      <!--TODO: Search with both of them not implemented 

      <div class="col-6">
        <b-form-select v-model="selected" class="mb-3">
          <b-form-select-option :value="null" disabled>Filtrar por destino</b-form-select-option>
          <b-form-select-option
            v-for="(vuelo, index) in vuelos"
            :key="index"
            @change="getDestinoItem"
          >{{vuelo.destino}}</b-form-select-option>
        </b-form-select>
      </div>

      TODO: Implemented Vera search to Origen and Destino-->

      <b-card-group columns v-if="vuelos">
        <b-card
          v-for="(vuelo, index) in vuelos"
          :key="index"
          tag="article"
          class="card"
          :elevation="10"
        >
          <b-card-img v-bind:src="vuelo.image" v-bind:alt="vuelo.idVuelo" class="card_image"></b-card-img>
          <b-card-title class="card_title">{{vuelo.origen + " - " +vuelo.destino}}</b-card-title>
          <b-list-group horizontal>
            <b-list-group-item>{{"Fecha: "+formatDate(vuelo.fecha,"ll")}}</b-list-group-item>
            <b-list-group-item>{{"Salida: "+vuelo.hora}}</b-list-group-item>
            <b-list-group-item>
              Plazas:
              <strong id="plazas">{{vuelo.disponibles+"/"+vuelo.totales}}</strong>
            </b-list-group-item>
          </b-list-group>
          <b-card-text class="card_precio">{{vuelo.precio +" €"}}</b-card-text>

          <b-button
            block
            variant="primary"
            v-b-modal.modal-center
            v-if="vuelo.disponibles > 0"
            :class="{ active: index == currentIndex }"
            @click="setActiveVuelo(vuelo, index)"
          >Ver Detalles</b-button>
          <b-button v-else block disabled variant="secondary">PLAZAS AGOTADAS</b-button>
        </b-card>
      </b-card-group>

      <!-- Detail Vuelos when selected one  -->
      <b-modal
        v-if="currentVuelo"
        id="modal-center"
        centered
        no-stacking
        :title="currentVuelo.Origen +' - '+currentVuelo.Destino"
      >
        <template v-slot:modal-header>
          <h3>{{currentVuelo.origen +' - '+currentVuelo.destino}}</h3>
        </template>
        <template v-slot:default>
          <div class="p-4" id="vuelo">
            <div>
              <label>
                <strong>idVuelo:</strong>
              </label>
              {{ currentVuelo.idVuelo }}
            </div>
            <div>
              <label>
                <strong>Origen:</strong>
              </label>
              {{ currentVuelo.origen }}
            </div>
            <div>
              <label>
                <strong>Destino:</strong>
              </label>
              {{ currentVuelo.destino }}
            </div>
            <div>
              <label>
                <strong>Precio:</strong>
              </label>
              {{ currentVuelo.precio+" €" }}
            </div>
            <div>
              <label>
                <strong>Fecha:</strong>
              </label>
              {{ formatDate(currentVuelo.fecha,"LL") }}
            </div>
            <div>
              <label>
                <strong>Hora:</strong>
              </label>
              {{ currentVuelo.hora }}
            </div>
            <div>
              <label>
                <strong>Plazas Disponibles:</strong>
              </label>
              {{ currentVuelo.disponibles+"/"+currentVuelo.totales }}
            </div>
          </div>
        </template>
        <template v-slot:modal-footer="{ close }">
          <b-button size="sm" variant="outline-danger" @click="close()">Cancelar Reserva</b-button>
          <b-button
            size="sm"
            variant="success"
            @click="bookingVuelo(currentVuelo.idVuelo,currentVuelo)"
            v-b-modal="'modal-successful'"
          >Reservar vuelo</b-button>
        </template>
      </b-modal>

      <b-modal id="modal-successful" centered size="sm" title="¡Enhorabuena!" ok-only>
        <p class="text text-center">Ha contratado un vuelo con</p>
        <img src="../assets/air-europa.png" class="img_logo_modal" />
      </b-modal>
    </div>
    <!-- Footer -->
    <footer class="footer page-footer font-small mt-1">
      <div class="footer footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="./">ComparadorVuelos</a>
      </div>
      <!-- Footer -->
    </footer>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import moment from "moment";

export default {
  name: "AirEuropa",
  data() {
    return {
      vuelos: [],
      currentVuelo: null,
      currentIndex: -1,
      Destino: "",

      selected: null
    };
  },
  methods: {
    //Get all data
    getALL() {
      DataService.getAllAirEuropa().then(response => {
        this.vuelos = response.data;
      });
    },

    //Refresh data
    refreshList() {
      this.getALL();
      this.currentVuelo = null;
      this.currentIndex = -1;
    },

    //Take current vuelo
    setActiveVuelo(vuelo, index) {
      this.currentVuelo = vuelo;
      this.currentIndex = index;
    },

    //Filter by origen
    getOrigenItem(origenSelected) {
      DataService.filterByOrigenAirEuropa(origenSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    //Filter by destino
    getDestinoItem(destinoSelected) {
      DataService.filterByDestinoAirEuropa(destinoSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    //Update to flight booking
    bookingVuelo(idVuelo) {
      DataService.updateAirEuropa(idVuelo);
      this.close();
    },

    //Format date
    formatDate(date, type) {
      return moment(date).format(type);
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
  width: 49em;
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
#plazas {
  font-size: 1.45em;
}
.card_image {
  width: 20em;
  height: 11em;
}
.card_precio {
  font-size: 2.5em;
  text-align: right;
}
.img_logo_modal {
  width: 16.5em;
  height: 5em;
  text-align: center;
}
</style>