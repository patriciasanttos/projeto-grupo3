import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAdmins = async () => {
    return await axiosGet('/admins');
}

export const getAdminById = async (id) => {
    return await axiosGet(`/admins/get/${id}`);
}

export const verifyAdmin = async (id) => {
    return await axiosGet(`/admins/verify/${id}`);
}

export const loginAdmin = async ({ user, password }) => {
    return await axiosGet(`/admins/login`, {
        headers: {
            'Authorization': `${user}:${password}`,
            'Content-Type': 'application/json'
        }
    });
}

export const createAdmin = async (data) => {
    return await axiosPost('/admins', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const updateAdmin = async (data) => {
    return await axiosPut('/admins', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const deleteAdmin = async (id) => {
    return await axiosDelete(`/admins/${id}`);
}