import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAnimals = async (token) => {
    return await axiosGet('/animals', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAnimalById = async (id, token) => {
    return await axiosGet(`/animals/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createAnimal = async (data, token) => {
    return await axiosPost('/animals', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateAnimal = async (data, token) => {
    return await axiosPut('/animals', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteAnimal = async (id, token) => {
    return await axiosDelete(`/animals/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}