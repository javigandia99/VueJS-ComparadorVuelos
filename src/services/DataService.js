import http from "../http-common";

class DataService {
  getData(compania) {
    return http.get(`${compania}/vuelos/fecha/origen/`);
  }

  update(compania, idVuelo, token) {
    return http.put(`${compania}/vuelos/${idVuelo}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-token': token
      }
    });
  }

  takeToken() {
    return http.post('auth/');
  }

}
export default new DataService();