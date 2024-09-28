import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

//-----Volunteers
export const getAllVolunteers = async (token) => {
    return await axiosGet('/volunteers/get', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getVolunteerById = async (id, token) => {
    return await axiosGet(`/volunteers/get/${id}`, {
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

//-----Volunteers forms
export const getAllVolunteersForms = async (token) => {
    return await axiosGet('/volunteers/forms', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createVolunteerForm = async (data) => {
    return await axiosPost('/volunteers/forms', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const acceptVolunteerForm = async (id, token) => {
    return await axiosGet(`/volunteers/forms/accept/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export const denyVolunteerForm = async (id, token) => {
    return await axiosDelete(`/volunteers/forms/deny/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}