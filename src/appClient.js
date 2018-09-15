import axios from "axios";

let appClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

export default appClient;
