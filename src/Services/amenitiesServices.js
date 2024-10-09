import axios from "axios";

const BASE_URL = 'http://localhost:3000'
//const BASE_URL = 'https://json-server-jwt.onrender.com'

const createAmenityService = (token, data) => axios.post(`${BASE_URL}/api/amenities/`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const getAllAmenitiesService = (token) => axios.get(`${BASE_URL}/api/amenities/`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const getAmenityByIdService = (token, id) => axios.get(`${BASE_URL}/api/amenities/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const getAmenityByNameService = (token, name) => axios.get(`${BASE_URL}/api/amenities/name/${name}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})


const updateAmenityByIdService = (token, data, id) => axios.put(`${BASE_URL}/api/amenities/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const deleteAmenityByIdService = (token, id) => axios.delete(`${BASE_URL}/api/amenities/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})


export {
    createAmenityService,
    getAllAmenitiesService,
    getAmenityByIdService,
    getAmenityByNameService,
    updateAmenityByIdService,
    deleteAmenityByIdService
}