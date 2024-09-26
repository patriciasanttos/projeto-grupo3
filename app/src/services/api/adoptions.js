import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAdoptions = async (token) => {
    return await axiosGet('/adoptions', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAdoptionById = async (id, token) => {
    return await axiosGet(`/adoptions/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createAdoption = async (data, token) => {
    return await axiosPost('/adoptions', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const updateAdoption = async (data, token) => {
    return await axiosPut('/adoptions', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const deleteAdoption = async (id, token) => {
    return await axiosDelete(`/adoptions/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}