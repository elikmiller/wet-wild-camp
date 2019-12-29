import axios from "axios";

const appClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
});

appClient.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        if (error.response) return Promise.reject(error.response.data);
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

const updateUser = ({ firstName, lastName, primaryContact, secondaryContact, emergencyContact, surveyQuestion }) => {
    return appClient.patch(`/users`, {
        firstName,
        lastName,
        primaryContact,
        secondaryContact,
        emergencyContact,
        surveyQuestion
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

const updateCamper = (camperId, { firstName, lastName, dateOfBirth, gender, notes }) => {
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

const createRegistration = ({ camper, camp, morningDropoff, afternoonPickup }) => {
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

const executePayment = (paymentId, payerId) => {
    return appClient.get(`/payments/execute?paymentId=${paymentId}&payerId=${payerId}`);
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

const getEarlyBird = () => {
    return appClient.get("/settings");
};

//
// Admin - Users
//

const adminGetUsers = () => {
    return appClient.get("/admin/users");
};

const getSurveyResults = () => {
    return appClient.get("/admin/users/survey");
};

const adminGetUser = userId => {
    return appClient.get(`/admin/users/${userId}`);
};

const adminUpdateUser = (userId, { firstName, lastName, primaryContact, secondaryContact, emergencyContact }) => {
    return appClient.patch(`/admin/users/${userId}`, {
        firstName,
        lastName,
        primaryContact,
        secondaryContact,
        emergencyContact
    });
};

const adminDeleteUser = userId => {
    return appClient.delete(`/admin/users/${userId}`);
};

//
// Admin - Campers
//

const adminGetCampers = params => {
    return appClient.get("/admin/campers", { params });
};

const adminGetCamper = camperId => {
    return appClient.get(`/admin/campers/${camperId}`);
};

const adminCreateCamper = ({ firstName, lastName, gender, dateOfBirth, swimmingStrength, notes, user }) => {
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

const adminUpdateCamper = (camperId, { firstName, lastName, gender, dateOfBirth, swimmingStrength, notes, user }) => {
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

const adminUpdateCamperBulk = campers => {
    return appClient.patch(`/admin/campers/`, campers);
};

const adminDeleteCamper = camperId => {
    return appClient.delete(`/admin/campers/${camperId}`);
};

const adminGetCamps = () => {
    return appClient.get("/admin/camps");
};

const adminGetCamp = campId => {
    return appClient.get(`/admin/camps/${campId}`);
};

const adminCreateCamp = ({ name, type, description, fee, capacity, startDate, endDate, openDate, closeDate }) => {
    return appClient.post("/admin/camps", {
        name,
        type,
        description,
        fee,
        capacity,
        startDate,
        endDate,
        openDate,
        closeDate
    });
};

const adminUpdateCamp = (
    campId,
    { name, type, description, fee, capacity, startDate, endDate, openDate, closeDate }
) => {
    return appClient.patch(`/admin/camps/${campId}`, {
        name,
        type,
        description,
        fee,
        capacity,
        startDate,
        endDate,
        openDate,
        closeDate
    });
};

const adminDeleteCamp = campId => {
    return appClient.delete(`/admin/camps/${campId}`);
};

const adminCampReportMonday = campId => {
    return appClient.get(`/admin/camps/${campId}/csv/monday`);
};

const adminCampReportSwimming = campId => {
    return appClient.get(`/admin/camps/${campId}/csv/swimming`);
};

const adminCampReportContact = campId => {
    return appClient.get(`/admin/camps/${campId}/csv/report`);
};

const adminCampReportSpecialNeeds = campId => {
    return appClient.get(`/admin/camps/${campId}/special-needs`);
};

const adminGetRegistrations = () => {
    return appClient.get("/admin/registrations");
};

const adminGetRegistration = registrationId => {
    return appClient.get(`/admin/registrations/${registrationId}`);
};

const adminCreateRegistration = ({
    camper,
    camp,
    morningDropoff,
    afternoonPickup,
    deposit,
    paid,
    waitlist,
    spaceSaved,
    user
}) => {
    return appClient.post("/admin/registrations", {
        camper,
        camp,
        morningDropoff,
        afternoonPickup,
        deposit,
        paid,
        waitlist,
        spaceSaved,
        user
    });
};

const adminUpdateRegistration = (
    registrationId,
    { campId, morningDropoff, afternoonPickup, waitlist, deposit, paid, spaceSaved }
) => {
    return appClient.patch(`/admin/registrations/${registrationId}`, {
        campId,
        morningDropoff,
        afternoonPickup,
        waitlist,
        deposit,
        paid,
        spaceSaved
    });
};

const adminDeleteRegistration = registrationId => {
    return appClient.delete(`/admin/registrations/${registrationId}`);
};

const adminGetPayments = () => {
    return appClient.get("/admin/payments");
};

const adminGetPayment = paymentId => {
    return appClient.get(`/admin/payments/${paymentId}`);
};

const adminUpdatePayment = (paymentId, notes) => {
    return appClient.patch(`/admin/payments/${paymentId}`, notes);
};

const adminDeletePayment = paymentId => {
    return appClient.delete(`/admin/payment/${paymentId}`);
};

const adminSendEmail = ({ from, to, cc, bcc, subject, text }) => {
    return appClient.post("/admin/email", { from, to, cc, bcc, subject, text });
};

const adminGetSettings = () => {
    return appClient.get("/admin/settings");
};

const adminUpdateSettings = settings => {
    return appClient.post("/admin/settings", settings);
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

    // Settings
    getEarlyBird,

    // Admin - Users
    adminGetUsers,
    adminGetUser,
    adminUpdateUser,
    adminDeleteUser,
    getSurveyResults,

    // Admin - Campers,
    adminGetCampers,
    adminGetCamper,
    adminCreateCamper,
    adminUpdateCamper,
    adminUpdateCamperBulk,
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
    adminCampReportSpecialNeeds,

    // Admin - Registrations,
    adminGetRegistrations,
    adminGetRegistration,
    adminCreateRegistration,
    adminUpdateRegistration,
    adminDeleteRegistration,

    // Admin - Payments
    adminGetPayments,
    adminGetPayment,
    adminUpdatePayment,
    adminDeletePayment,

    // Admin - Misc.
    adminSendEmail,
    adminUpdateSettings,
    adminGetSettings
};
