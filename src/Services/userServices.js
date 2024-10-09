import axios from "axios";

const BASE_URL = 'http://localhost:3000'
//const BASE_URL = 'https://json-server-jwt.onrender.com'

const registerUserService = (data) => axios.post(`${BASE_URL}/api/users/registro`, data)

const createUserService = (token, data) => axios.post(`${BASE_URL}/api/users/`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const getUserByIdService = (token, id) => axios.get(`${BASE_URL}/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const updateUserByIdService = (token, data, id) => axios.put(`${BASE_URL}/api/users/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
        'proxy':'http://localhost:3000',
        withCredentials: false,
        Authorization: `Bearer ${token}`
    }
})

const deleteUserByIdService = (token, id) => axios.delete(`${BASE_URL}/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const loginUserService = (data) => axios.post(`${BASE_URL}/api/users/login`, data)

const getUserService = (token) => axios.get(`${BASE_URL}/users/me`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})


export {
    getUserByIdService,
    registerUserService,
    createUserService,
    updateUserByIdService,
    loginUserService,
    deleteUserByIdService,
    getUserService
}