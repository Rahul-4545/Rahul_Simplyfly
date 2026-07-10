import api from "../api/axios";

export const getRefunds = () => {

    return api.get("/api/refunds/getall");

};

export const getRefundById = (id) => {

    return api.get(`/api/refunds/getbyid/${id}`);

};

export const addRefund = (refund) => {

    return api.post("/api/refunds/add", refund);

};

export const updateRefund = (refund) => {

    return api.put("/api/refunds/update", refund);

};

export const deleteRefund = (id) => {

    return api.delete(`/api/refunds/delete/${id}`);

};

export const searchRefundStatus = (status) => {

    return api.get(`/api/refunds/status/${status}`);

};

export const searchRefundBooking = (bookingId) => {

    return api.get(`/api/refunds/booking/${bookingId}`);

};

export const amountGreaterThan = (amount) => {

    return api.get(`/api/refunds/amount/${amount}`);

};

export const sortAmountDesc = () => {

    return api.get("/api/refunds/amountdesc");

};
export const getRefundsByUser = (userId) => {

    return api.get(`/api/refunds/user/${userId}`);

};
export const getRefundsByOwner = (ownerId) => {

    return api.get(`/api/refunds/owner/${ownerId}`);

};