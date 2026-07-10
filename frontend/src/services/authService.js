import axios from "axios";

const AUTH_URL = "http://localhost:8081/auth";
const USER_URL = "http://localhost:8081/api/users";

export const loginUser = (loginData) => {
    return axios.post(`${AUTH_URL}/login`, loginData);
};

export const registerUser = (userData) => {
    return axios.post(`${USER_URL}/add`, userData);
};

export const forgotPassword = (data) => {
    return axios.post(`${AUTH_URL}/forgot-password`, data);
};