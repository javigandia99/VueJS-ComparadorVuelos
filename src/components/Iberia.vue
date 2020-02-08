<template>
  <div class="container mt-4">
    <div class="list row">
      <div class="col-12 col-md-12 mb-4">
        <img class="img_logo" src="../assets/iberia.png" />
      </div>

      <div class="search-wrapper mb-2 col-12">
        <input
          class="form-control"
          type="text"
          v-model="searchQuery"
          placeholder="Buscar vuelos por origen"
        />
      </div>

      <b-card-group columns>
        <b-card
          v-for="(vuelo, index) in FilteredVuelos"
          :key="index"
          tag="article"
          class="card"
          :elevation="10"
        >
          <b-card-img v-bind:src="vuelo.image" v-bind:alt="vuelo.idVuelo" class="card_image"></b-card-img>
          <b-card-title class="card_title">{{vuelo.origen + " - " +vuelo.destino}}</b-card-title>
          <b-list-group horizontal>
            <b-list-group-item>{{"Fecha: "+formatDate(vuelo.fecha)}}</b-list-group-item>
            <b-list-group-item>{{"Salida: "+vuelo.hora}}</b-list-group-item>
            <b-list-group-item>
              Plazas:
              <strong id="plazas">{{vuelo.disponibles+"/"+vuelo.totales}}</strong>
            </b-list-group-item>
          </b-list-group>
          <b-card-text class="card_precio">{{vuelo.precio +" €"}}</b-card-text>

          <b-button
            block
            variant="danger"
            v-b-modal.modal-center
            v-if="vuelo.disponibles > 0"
            :class="{ active: index == currentIndex }"
            @click="setActiveVuelo(vuelo, index)"
          >Ver Detalles</b-button>
          <b-button v-else block disabled variant="warning">PLAZAS AGOTADAS</b-button>
        </b-card>
      </b-card-group>

      <!-- Detail Vuelos when selected one  -->
      <b-modal
        v-if="currentVuelo"
        id="modal-center"
        class="modal-backdrop"
        centered
        no-stacking
        :title="currentVuelo.Origen +' - '+currentVuelo.Destino"
      >
        <template v-slot:modal-header>
          <!-- Emulate built in modal header close button action -->

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

        <template v-slot:modal-footer="{close}">
          <!-- Emulate built in modal footer ok button actions -->
          <b-button size="sm" variant="outline-danger" @click="close()">Cancelar Reserva</b-button>
          <b-button
            size="sm"
            variant="success"
            @click="bookingVuelo(currentVuelo.idVuelo,currentVuelo)"
            v-b-modal="'modal-successful'"
          >Reservar vuelo</b-button>
        </template>
      </b-modal>

      <b-modal id="modal-successful" centered size="sm" title="¡Enhorabuena!" >
        <p class="text text-center">Ha contratado un vuelo con</p>
        <img src="../assets/iberia.png" class="img_logo_modal" />
         <template v-slot:modal-footer="{ok}">
          <b-button size="sm" variant="outline-success" @click="ok()">Ok</b-button>
        </template>
        
      </b-modal>
    </div>
    <!-- Footer -->
    <footer class="page-footer font-small blue">
      <div class="footer-copyright text-center py-3">
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
      searchQuery: null
    };
  },
  methods: {
    //Get all data
    getALL() {
      DataService.getAllIberia().then(response => {
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
      DataService.filterByOrigenIberia(origenSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    //Filter by destino
    getDestinoItem(destinoSelected) {
      DataService.filterByDestinoIberia(destinoSelected).then(response => {
        this.vuelos = response.data;
      });
    },

    //Update to flight booking
    bookingVuelo(idVuelo) {
      DataService.updateIberia(idVuelo);
    },

    //Format date
    formatDate(date) {
      return moment(date).format("ll");
    }
  },
  mounted() {
    this.getALL();
  },
  computed: {
    FilteredVuelos() {
      if (this.searchQuery) {
        return this.vuelos.filter(vuelo => {
          vuelo.origen.startsWith(this.searchQuery);
        });
      } else {
        return this.vuelos;
      }
    }
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
.img_logo_modal {
  width: 16.5em;
  height: 6em;
  text-align: center;
}
.modal-backdrop {
  opacity: 0.7;
}
</style>