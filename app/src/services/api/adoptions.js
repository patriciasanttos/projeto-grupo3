import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

//-----Adoptions
export const getAllAdoptions = async (token) => {
    return await axiosGet('/adoptions/get', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAdoptionById = async (id, token) => {
    return await axiosGet(`/adoptions/get/${id}`, {
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

//-----Adoptions form
export const getAllSAdoptionForms = async (token) => {
    return await axiosGet('/adoptions/forms', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createAdoptionForm = async (data) => {
    return await axiosPost('/adoptions/forms', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const acceptAdoptionForm = async (id, token) => {
    return await axiosGet(`/adoptions/forms/accept/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export const denyAdoptionForm = async (id, token) => {
    return await axiosDelete(`/adoptions/forms/deny/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}