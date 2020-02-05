import http from "../http-common";

class DataService {
  getAll() {
    return http.get("aireuropa/vuelos/fecha/origen/");
  }

  get(id) {
    return http.get(`aireuropa/vuelos/fecha/origen/:${id}`);
  }

  /*
    update(id, data) {
      return http.put(`/vuelos/fecha/origen/:${destino}`, data);
    }
  */
  findByDestino(destino) {
    return http.get(`aireuropa/vuelos/fecha/origen/:${destino}`);
  }

}
export default new DataService();