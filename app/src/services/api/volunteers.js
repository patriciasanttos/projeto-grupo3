import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllVolunteers = async () => {
    return await axiosGet('/volunteers');
}

export const getVolunteerById = async (id) => {
    return await axiosGet(`/volunteers/${id}`);
}

export const createVolunteer = async (data) => {
    return await axiosPost('/volunteers', data);
}

export const updateVolunteer = async (data) => {
    return await axiosPut('/volunteers', data);
}

export const deleteVolunteer = async (id) => {
    return await axiosDelete(`/volunteers/${id}`);
}