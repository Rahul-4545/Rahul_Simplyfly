import api from "../api/axios";

export const getBookings = () => {

    return api.get("/api/bookings/getall");

};

export const getBookingById = (id) => {

    return api.get(`/api/bookings/getbyid/${id}`);

};

export const addBooking = (booking) => {

    return api.post("/api/bookings/add", booking);

};

export const updateBooking = (booking) => {

    return api.put("/api/bookings/update", booking);

};

export const deleteBooking = (id) => {

    return api.delete(`/api/bookings/delete/${id}`);

};

export const searchBookingStatus = (status) => {

    return api.get(`/api/bookings/status/${status}`);

};

export const searchUserBookings = (userId) => {

    return api.get(`/api/bookings/user/${userId}`);

};

export const searchFlightBookings = (flightId) => {

    return api.get(`/api/bookings/flight/${flightId}`);

};

export const amountGreaterThan = (amount) => {

    return api.get(`/api/bookings/amount/${amount}`);

};

export const sortAmountDesc = () => {

    return api.get("/api/bookings/amountdesc");

};
export const getBookingsByOwner = (ownerId) => {

    return api.get(`/api/bookings/owner/${ownerId}`);

};
export const getBookingsByUser = (userId) => {

    return api.get(`/api/bookings/user/${userId}`);

};
export const bookingExists = (userId, flightId) => {

    return api.get(

        `/api/bookings/exists/${userId}/${flightId}`

    );

};