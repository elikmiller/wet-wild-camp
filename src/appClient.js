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

const getUsers = () => {
  return appClient.get("/users");
};

const getUser = userId => {
  return appClient.get(`/users/${userId}`);
};

const getAdminUser = userId => {
  return appClient.get(`/admin/users/${userId}`);
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

const getCamp = id => {
  return appClient.get(`/camps/${id}`);
};

const newCamp = data => {
  return appClient.post("/camps", data);
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

const getRegistrations = () => {
  return appClient.get("/registrations");
};

const deleteRegistration = registrationId => {
  return appClient.delete(`/registrations/${registrationId}`);
};

const deleteRegistrationByCamp = (campId, camperId) => {
  return appClient.delete(`/registrations/${campId}/${camperId}`);
};

const addPayment = (userId, data) => {
  return appClient.post(`/${userId}/payments`, data);
};

const getPayment = paypalId => {
  return appClient.get(`/payments/${paypalId}`);
};

const getAllPayments = () => {
  return appClient.get("/payments");
};

const executePayment = (userId, paymentId, payerId) => {
  return appClient.get(
    `/${userId}/payments/execute?paymentId=${paymentId}&payerId=${payerId}`
  );
};

const deletePayment = paypalId => {
  return appClient.delete(`/payments/${paypalId}`);
};

const sendEmail = data => {
  return appClient.post("/admin/email", data);
};

const cancelRequest = () => {
  source.cancel("Operation cancelled by the user.");
};

export default {
  currentUser,
  getUser,
  getUsers,
  getAdminUser,
  login,
  logout,
  register,
  getCampers,
  updateCamper,
  getContacts,
  updateUser,
  addCamper,
  getCamps,
  getCamp,
  newCamp,
  updateCamp,
  cancelRequest,
  createRegistration,
  getUserRegistrations,
  getRegistrations,
  deleteRegistration,
  deleteRegistrationByCamp,
  addPayment,
  getPayment,
  getAllPayments,
  executePayment,
  deletePayment,
  sendEmail
};
