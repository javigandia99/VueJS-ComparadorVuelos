<template src='./detailAirEuropa.html' lang='html'>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "detailAirEuropa",
  data() {
    return {
      currentVuelo: null,
      message: ""
    };
  },
  methods: {
    getVuelo(id) {
      DataService.get(id)
        .then(response => {
          this.currentVuelo = response.data;
          print(response.data);
        })
        .catch(e => {
          print(e);
        });
    },

    updatePublished(status) {
      var data = {
        plazas: this.currentVuelo.plazas
      };

      DataService.update(this.currentVuelo.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          print(response.data);
        })
        .catch(e => {
          print(e);
        });
    },

    updateVuelo() {
      DataService.update(this.currentVuelo.id, this.currentVuelo)
        .then(response => {
          print(response.data);
          this.message = "El vuelo ha sido reservado, -1 plaza";
        })
        .catch(e => {
          print(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getVuelo(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
