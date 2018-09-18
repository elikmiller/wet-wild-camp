import axios from "axios";

const appClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

const login = ({ email, password }) => {
  return appClient.post("/login", { email, password });
};

const logout = () => {
  return appClient.get("/logout");
};

const register = ({ firstName, lastName, email, password }) => {
  return appClient.post("/users", { firstName, lastName, email, password });
};

const currentUser = () => {
  return appClient.get("/current_user");
};

export default { currentUser, login, logout, register };
