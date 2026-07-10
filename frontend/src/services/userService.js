import api from "../api/axios";


export const getUsers = () => {
    return api.get("/api/users/getall");
};

export const getUserById = (id) => {
    return api.get(`/api/users/getbyid/${id}`);
};

export const updateUser = (user) => {
    return api.put("/api/users/update", user);
};

export const deleteUser = (id) => {
    return api.delete(`/api/users/delete/${id}`);
};
export const addUser = (user) => {

    return api.post("/api/users/add", user);

};