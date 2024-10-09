import axios from "axios";

const BASE_URL = 'http://localhost:3000'
//const BASE_URL = 'https://json-server-jwt.onrender.com'

const getAllVenuesService = (token) => axios.get(`${BASE_URL}/api/venues/`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})


const createVenueService = (token, data) => axios.post(`${BASE_URL}/api/venues/`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const getVenueByIdService = (token, id) => axios.get(`${BASE_URL}/api/venues/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const updateVenueByIdService = (token, data, id) => axios.put(`${BASE_URL}/api/venues/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

const deleteVenueByIdService = (token, id) => axios.delete(`${BASE_URL}/api/venues/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }           
})

export {
    createVenueService,
    getAllVenuesService,
    updateVenueByIdService,
    getVenueByIdService,
    deleteVenueByIdService
}