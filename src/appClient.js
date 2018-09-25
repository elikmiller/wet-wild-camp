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

const updateUser = ({ id, data }) => {
  return appClient.patch(`/users/${id}`, data);
};

const getCampers = userId => {
  return appClient.get(`/users/${userId}/campers`);
};

const addCamper = data => {
  return appClient.post(`/campers`, data);
};

const updateCamper = ({ id, data }) => {
  return appClient.patch(`/campers/${id}`, data);
};

const getContacts = userId => {
  return appClient.get(`/users/${userId}/contacts`);
};

const getCamps = () => {
  return appClient.get(`/camps`);
};

const updateCamp = ({ id, data }) => {
  return appClient.patch(`/camps/${id}`, data);
};

export default {
  currentUser,
  login,
  logout,
  register,
  getCampers,
  updateCamper,
  getContacts,
  updateUser,
  addCamper,
  getCamps,
  updateCamp
};
