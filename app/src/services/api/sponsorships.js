import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllSponsorshipships = async () => {
    return await axiosGet('/sponsorships');
}

export const getSponsorshipById = async (id) => {
    return await axiosGet(`/sponsorships/${id}`);
}

export const createSponsorship = async (data) => {
    return await axiosPost('/sponsorships', data);
}

export const updateSponsorship = async (data) => {
    return await axiosPut('/sponsorships', data);
}

export const deleteSponsorship = async (id) => {
    return await axiosDelete(`/sponsorships/:${id}`);
}