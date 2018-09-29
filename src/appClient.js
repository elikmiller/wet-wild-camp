import axios from "axios";
const { CancelToken } = axios;
const source = CancelToken.source();

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

const updateCamp = (id, data) => {
  return appClient.patch(`/camps/${id}`, data);
};

const createRegistration = data => {
  return appClient.post("/registrations", data);
};

const getUserRegistrations = userId => {
  return appClient.get(`/users/${userId}/registrations`);
};

const cancelRequest = () => {
  source.cancel("Operation cancelled by the user.");
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
  updateCamp,
  cancelRequest,
  createRegistration,
  getUserRegistrations
};
