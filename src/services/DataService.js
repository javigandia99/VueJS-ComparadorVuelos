import http from "../http-common";

class DataService {
  getAllAirEuropa() {
    return http.get("aireuropa/vuelos/fecha/origen/");
  }

  getAllIberia() {
    return http.get("iberia/vuelos/fecha/origen/");
  }

  getAirEuropa(destino) {
    return http.get(`aireuropa/vuelos/fecha/origen/:${destino}`);
  }

  getIberia(destino) {
    return http.get(`iberia/vuelos/fecha/origen/:${destino}`);
  }

  updateAirEuropa(destino, data) {
    return http.put(`aireuropa/vuelos/fecha/origen/:${destino}`, data);
  }

  updateIberia(destino, data) {
    return http.put(`iberia/vuelos/fecha/origen/:${destino}`, data);
  }

  findByDestinoAirEuropa(destino) {
    return http.get(`aireuropa/vuelos/fecha/origen/:${destino}`);
  }

  findByDestinoIberia(destino) {
    return http.get(`iberia/vuelos/fecha/origen/:${destino}`);
  }

}
export default new DataService();