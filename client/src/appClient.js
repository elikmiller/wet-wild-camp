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
    if (error.response) return Promise.reject(error.response);
    else if (error.request) return Promise.reject(error.request);
    else return Promise.reject(error);
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

const currentUser = () => {
  return appClient.get("/auth/current_user");
};

const passwordReset = ({ email }) => {
  return appClient.post("/auth/password_reset", { email });
};

const redeemPasswordResetToken = ({ token, password }) => {
  return appClient.post("/auth/redeem_password_reset_token", {
    token,
    password
  });
};

//
// User
//

const createUser = ({ firstName, lastName, email, password }) => {
  return appClient.post("/users", { firstName, lastName, email, password });
};

const getUser = () => {
  return appClient.get(`/users`);
};

const updateUser = ({
  firstName,
  lastName,
  primaryContact,
  secondaryContact,
  emergencyContact
}) => {
  return appClient.patch(`/users`, {
    firstName,
    lastName,
    primaryContact,
    secondaryContact,
    emergencyContact
  });
};

//
// Camper
//

const getCampers = () => {
  return appClient.get(`/campers`);
};

const getCamper = camperId => {
  return appClient.get(`/campers/${camperId}`);
};

const createCamper = ({ firstName, lastName, dateOfBirth, gender, notes }) => {
  return appClient.post(`/campers`, {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    notes
  });
};

const updateCamper = (
  camperId,
  { firstName, lastName, dateOfBirth, gender, notes }
) => {
  return appClient.patch(`/campers/${camperId}`, {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    notes
  });
};

const deleteCamper = camperId => {
  return appClient.delete(`/campers/${camperId}`);
};

//
// Camp
//

const getCamps = () => {
  return appClient.get(`/camps`);
};

const getCamp = campId => {
  return appClient.get(`/camps/${campId}`);
};

//
// Registration
//

const getRegistrations = () => {
  return appClient.get("/registrations");
};

const getRegistration = registrationId => {
  return appClient.get(`/registrations/${registrationId}`);
};

const createRegistration = ({
  camper,
  camp,
  morningDropoff,
  afternoonPickup
}) => {
  return appClient.post("/registrations", {
    camper,
    camp,
    morningDropoff,
    afternoonPickup
  });
};

const deleteRegistration = registrationId => {
  return appClient.delete(`/registrations/${registrationId}`);
};

//
// Payment
//

const executePayment = paymentId => {
  return appClient.get(`/payments/${paymentId}/execute`);
};

const getPayments = () => {
  return appClient.get("/payments");
};

const getPayment = paymentId => {
  return appClient.get(`/payments/${paymentId}`);
};

const createPayment = ({ fullPayments, deposits }) => {
  return appClient.post(`/payments`, { fullPayments, deposits });
};

const deletePayment = paymentId => {
  return appClient.delete(`/payments/${paymentId}`);
};

//
// Admin - Users
//

const adminGetUsers = () => {
  return appClient.get("/admin/users");
};

const adminGetUser = userId => {
  return appClient.get(`/admin/users/${userId}`);
};

const adminUpdateUser = (
  userId,
  { firstName, lastName, primaryContact, secondaryContact, emergencyContact }
) => {
  return appClient.patch(`/admin/users/${userId}`, {
    firstName,
    lastName,
    primaryContact,
    secondaryContact,
    emergencyContact
  });
};

//
// Admin - Campers
//

const adminGetCampers = () => {
  return appClient.get("/admin/campers");
};

const adminGetCamper = camperId => {
  return appClient.get(`/admin/campers/${camperId}`);
};

const adminCreateCamper = ({
  firstName,
  lastName,
  gender,
  dateOfBirth,
  swimmingStrength,
  notes,
  user
}) => {
  return appClient.post("/admin/campers/", {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    swimmingStrength,
    notes,
    user
  });
};

const adminUpdateCamper = (
  camperId,
  { firstName, lastName, gender, dateOfBirth, swimmingStrength, notes, user }
) => {
  return appClient.patch(`/admin/campers/${camperId}`, {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    swimmingStrength,
    notes,
    user
  });
};

const adminDeleteCamper = camperId => {
  return appClient.delete(`/admin/campers/${camperId}`);
};

export default {
  // Auth
  login,
  logout,
  currentUser,
  passwordReset,
  redeemPasswordResetToken,

  // Users
  getUser,
  createUser,
  updateUser,

  // Campers
  getCampers,
  getCamper,
  createCamper,
  updateCamper,
  deleteCamper,

  // Camps
  getCamps,
  getCamp,

  // Registrations
  getRegistrations,
  getRegistration,
  createRegistration,
  deleteRegistration,

  // Payments
  executePayment,
  getPayments,
  getPayment,
  createPayment,
  deletePayment,

  // Admin - Users
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,

  // Admin - Campers,
  adminGetCampers,
  adminGetCamper,
  adminCreateCamper,
  adminUpdateCamper,
  adminDeleteCamper,

  // Admin - Camps,
  adminGetCamps,
  adminGetCamp,
  adminCreateCamp,
  adminUpdateCamp,
  adminDeleteCamp,
  adminCampReportMonday,
  adminCampReportSwimming,
  adminCampReportContact,

  // Admin - Registrations,
  adminGetRegistrations,
  adminGetRegistration,
  adminCreateRegistration,
  adminUpdateRegistration,
  adminDeleteRegistration,

  // Admin - Payments
  adminGetPayments,
  adminGetPayment,
  adminDeletePayment,

  // Admin - Misc.
  adminSendEmail
};
