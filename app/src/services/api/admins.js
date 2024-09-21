import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAdmins = async () => {
    return await axiosGet('/admins');
}

export const getAdminById = async (id) => {
    return await axiosGet(`/admins/get/${id}`);
}

export const loginAdmin = async ({ user, password }) => {
    return await axiosGet(`/admins/login`, {
        headers: {
            'Authorization': `${user}:${password}`
        }
    });
}

export const createAdmin = async (data) => {
    return await axiosPost('/admins', data);
}

export const updateAdmin = async (data) => {
    return await axiosPut('/admins', data);
}

export const deleteAdmin = async (id) => {
    return await axiosDelete(`/admins/${id}`);
}