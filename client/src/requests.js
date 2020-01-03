import axios from "axios";

 function authenticate(username, password, route, type, board) {
  return axios.post('/'+route, {
    username,
    password,
    type,
    board
  });
}

export default authenticate

