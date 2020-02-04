import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/vuelos/fecha/origen/");
  }

  get(destino) {
    return http.get(`/vuelos/fecha/origen/:${destino}`);
  }
/*
  update(id, data) {
    return http.put(`/vuelos/fecha/origen/:${destino}`, data);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
  */
}