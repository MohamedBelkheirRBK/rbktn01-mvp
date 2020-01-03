import axios from "axios";

function authenticate(username, password, route) {
  return axios.post('/'+route, {
    username,
    password
  });
}

export default authenticate;