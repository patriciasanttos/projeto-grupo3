import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllVolunteers = async (token) => {
    return await axiosGet('/volunteers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getVolunteerById = async (id, token) => {
    return await axiosGet(`/volunteers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createVolunteer = async (data, token) => {
    return await axiosPost('/volunteers', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const updateVolunteer = async (data, token) => {
    return await axiosPut('/volunteers', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const deleteVolunteer = async (id, token) => {
    return await axiosDelete(`/volunteers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}