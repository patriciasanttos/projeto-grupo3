import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAdoptions = async () => {
    return await axiosGet('/adoptions');
}

export const getAdoptionById = async (id) => {
    return await axiosGet(`/adoptions/${id}`);
}

export const createAdoption = async (data) => {
    return await axiosPost('/adoptions', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const updateAdoption = async (data) => {
    return await axiosPut('/adoptions', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const deleteAdoption = async (id) => {
    return await axiosDelete(`/adoptions/${id}`);
}