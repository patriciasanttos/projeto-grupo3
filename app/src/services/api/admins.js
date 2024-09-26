import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAdmins = async (token) => {
    return await axiosGet('/admins', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAdminById = async (id,  token) => {
    return await axiosGet(`/admins/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const verifyAdmin = async (id,  token) => {
    return await axiosGet(`/admins/verify/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const loginAdmin = async ({ user, password },  token) => {
    return await axiosGet(`/admins/login`, {
        headers: {
            'Authorization': `${user}:${password}`,
            'Content-Type': 'application/json',
        }
    });
}

export const createAdmin = async (data,  token) => {
    return await axiosPost('/admins', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const updateAdmin = async (data,  token) => {
    return await axiosPut('/admins', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const deleteAdmin = async (id,  token) => {
    return await axiosDelete(`/admins/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}