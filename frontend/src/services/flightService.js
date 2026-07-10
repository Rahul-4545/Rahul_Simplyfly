import api from "../api/axios";

export const getFlights = () => {

    return api.get("/api/flights/getall");

};

export const getFlightById = (id) => {

    return api.get(`/api/flights/getbyid/${id}`);

};

export const addFlight = (flight) => {

    return api.post("/api/flights/add", flight);

};

export const updateFlight = (flight) => {

    return api.put("/api/flights/update", flight);

};

export const deleteFlight = (id) => {

    return api.delete(`/api/flights/delete/${id}`);

};

export const searchByFlightName = (name) => {

    return api.get(`/api/flights/name/${name}`);

};

export const searchByOrigin = (origin) => {

    return api.get(`/api/flights/origin/${origin}`);

};

export const searchByDestination = (destination) => {

    return api.get(`/api/flights/destination/${destination}`);

};

export const sortFareAsc = () => {

    return api.get("/api/flights/fareasc");

};

export const sortFareDesc = () => {

    return api.get("/api/flights/faredesc");

};
export const getFlightsByOwner = (ownerId) => {

    return api.get(`/api/flights/owner/${ownerId}`);

};

export const getAllFlights = () => {

    return api.get("/api/flights/getall");

};

export const getFlightsByOriginDestination = (

    origin,

    destination

) => {

    return api.get(

        `/api/flights/search/${origin}/${destination}`

    );

};