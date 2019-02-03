import axios from "axios";

const appClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

appClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response && error.response.status !== 401) console.error(error);
    return Promise.reject(error);
  }
);

//
// Auth
//

const login = ({ email, password }) => {
  return appClient.post("/auth/login", { email, password });
};

const logout = () => {
  return appClient.get("/auth/logout");
};

const forgotPassword = data => {
  return appClient.post("/auth/password_reset", data);
};

const resetPassword = data => {
  return appClient.post("/auth/redeem_password_reset_token", data);
};

const currentUser = () => {
  return appClient.get("/auth/current_user");
};

//
// User
//

const createUser = ({ firstName, lastName, email, password }) => {
  return appClient.post("/users", { firstName, lastName, email, password });
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

//
// Camper
//

const getCamper = id => {
  return appClient.get(`/campers/${id}`);
};

const getCampers = userId => {
  return appClient.get(`/users/${userId}/campers`);
};

const getAllCampers = () => {
  return appClient.get("/campers");
};

const addCamper = data => {
  return appClient.post(`/campers`, data);
};

const updateCamper = ({ id, data }) => {
  return appClient.patch(`/campers/${id}`, data);
};

const updateManyCampers = data => {
  return appClient.patch("/campers", data);
};

const deleteCamper = camperId => {
  return appClient.delete(`/campers/${camperId}`);
};

const adminDeleteCamper = camperId => {
  return appClient.delete(`/admin/campers/${camperId}`);
};

const getContacts = userId => {
  return appClient.get(`/users/${userId}/contacts`);
};

//
// Camp
//

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

const deleteCamp = id => {
  return appClient.delete(`/camps/${id}`);
};

const moveFromWaitlist = (campId, camperId) => {
  return appClient.get(`/camps/${campId}/${camperId}`);
};

//
// Registration
//

const createRegistration = data => {
  return appClient.post("/registrations", data);
};

const getUserRegistrations = () => {
  return appClient.get(`/registrations`);
};

const getRegistrations = () => {
  return appClient.get("/registrations");
};

const getRegistration = registrationId => {
  return appClient.get(`/registrations/${registrationId}`);
};

const updateRegistration = (registrationId, data) => {
  return appClient.patch(`/registrations/${registrationId}`, data);
};

const deleteRegistration = registrationId => {
  return appClient.delete(`/registrations/${registrationId}`);
};

const adminDeleteRegistration = registrationId => {
  return appClient.delete(`/admin/registrations/${registrationId}`);
};

//
// Payment
//

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

//
// Misc.
//

const sendEmail = data => {
  return appClient.post("/admin/email", data);
};

export default {
  currentUser,
  getUser,
  getUsers,
  getAdminUser,
  login,
  logout,
  createUser,
  getCamper,
  getCampers,
  getAllCampers,
  updateCamper,
  updateManyCampers,
  deleteCamper,
  adminDeleteCamper,
  getContacts,
  updateUser,
  addCamper,
  getCamps,
  getCamp,
  newCamp,
  updateCamp,
  deleteCamp,
  moveFromWaitlist,
  createRegistration,
  getUserRegistrations,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
  adminDeleteRegistration,
  addPayment,
  getPayment,
  getAllPayments,
  executePayment,
  deletePayment,
  sendEmail,
  forgotPassword,
  resetPassword
};
