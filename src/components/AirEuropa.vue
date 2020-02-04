<template>
  <div v-if="currentVuelo" class="edit-form">
    <h4>AIR-EUROPA</h4>
    <form>
      <div class="form-group">
        <label for="title">ID VUELO</label>
        <input type="text" class="form-control" id="title" v-model="currentVuelo.idVuelo" />
      </div>
      <div class="form-group">
        <label for="description">ORIGEN</label>
        <input type="text" class="form-control" id="description" v-model="currentVuelo.origen" />
      </div>
       <div class="form-group">
        <label for="description">DESTINO</label>
        <input type="text" class="form-control" id="description" v-model="currentVuelo.destino" />
      </div>
    </form>
<!--
    <button
      class="badge badge-primary mr-2"
      v-if="currentVuelo.published"
      @click="updatePublished(false)"
    >UnPublish</button>
    <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">Publish</button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">Update</button>
    -->
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a VUELO AIR EUROPA...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "aireuropa",
  data() {
    return {
      currentVuelo: null,
      message: ""
    };
  },
  methods: {
    getVuelos(destino) {
      DataService.get(destino)
        .then(response => {
          this.currentVuelo = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
/*
    updatePlazas(plazas) {
      var data = {
        idVuelo: this.currentVuelo.idVuelo,
        origen: this.currentVuelo.origen,
        destino: this.currentVuelo.destino,
        fecha: this.currentVuelo.fecha,
        hora: this.currentVuelo.hora,
        precio: this.currentVuelo.precio,
        plazas: this.currentVuelo.plazas
      };

      DataService.update(this.currentVuelo.id, data)
        .then(response => {
         // this.currentVuelo.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    update() {
      DataService.update(this.currentVuelo.idVuelo, this.currentVuelo)
        .then(response => {
          console.log(response.data);
          this.message = "The vuelo was updated successfully!";
        })
        .catch(e => {
          console.log(e);
        });
    }*/
  },
  
  mounted() {
    this.message = "";
    this.getVuelos(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
