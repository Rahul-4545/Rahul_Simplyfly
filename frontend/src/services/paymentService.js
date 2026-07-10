import api from "../api/axios";

export const getPayments = () => {

    return api.get("/api/payments/getall");

};

export const getPaymentById = (id) => {

    return api.get(`/api/payments/getbyid/${id}`);

};

export const addPayment = (payment) => {

    return api.post("/api/payments/add", payment);

};

export const updatePayment = (payment) => {

    return api.put("/api/payments/update", payment);

};

export const deletePayment = (id) => {

    return api.delete(`/api/payments/delete/${id}`);

};

export const searchPaymentStatus = (status) => {

    return api.get(`/api/payments/status/${status}`);

};

export const searchPaymentMethod = (method) => {

    return api.get(`/api/payments/method/${method}`);

};

export const searchBookingPayment = (bookingId) => {

    return api.get(`/api/payments/booking/${bookingId}`);

};

export const amountGreaterThan = (amount) => {

    return api.get(`/api/payments/amount/${amount}`);

};

export const sortAmountDesc = () => {

    return api.get("/api/payments/amountdesc");

};
export const getPaymentsByOwner=(ownerId)=>{

    return api.get(`/api/payments/owner/${ownerId}`);

}

export const getPaymentsByUser = (userId) => {

    return api.get(`/api/payments/user/${userId}`);

};
export const paymentExists = (bookingId) => {

    return api.get(`/api/payments/exists/${bookingId}`);

};