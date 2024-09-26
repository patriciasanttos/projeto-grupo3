import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllSponsorshipships = async (token) => {
    return await axiosGet('/sponsorships', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getSponsorshipById = async (id, token) => {
    return await axiosGet(`/sponsorships/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createSponsorship = async (data, token) => {
    return await axiosPost('/sponsorships', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const updateSponsorship = async (data, token) => {
    return await axiosPut('/sponsorships', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}

export const deleteSponsorship = async (id, token) => {
    return await axiosDelete(`/sponsorships/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}