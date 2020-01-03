import axios from "axios";

export function authenticate(username, password, route) {
  return axios.post('/'+route, {
    username,
    password
  });
}

export function ping() {

}

