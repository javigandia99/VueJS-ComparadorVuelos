import http from "../http-common";

class DataService {
  getAllAirEuropa() {
    return http.get("aireuropa/vuelos/fecha/origen/");
  }

  getDestinoAirEuropa(origen) {
    return http.get(`aireuropa/vuelos/fecha/:${origen}/destino/`);
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

  updateAirEuropa(IdVuelo, data) {
    return http.put(`aireuropa/vuelos/${IdVuelo}`, data);
  }

  updateIberia(IdVuelo, data) {
    return http.put(`iberia/vuelos/${IdVuelo}`, data);
  }

  findByDestinoAirEuropa(destino) {
    return http.get(`aireuropa/vuelos/fecha/origen/:${destino}`);
  }

  findByDestinoIberia(destino) {
    return http.get(`iberia/vuelos/fecha/origen/:${destino}`);
  }

}
export default new DataService();