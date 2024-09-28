import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

//-----Sponsorships
export const getAllSponsorshipships = async (token) => {
    return await axiosGet('/sponsorships/get', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getSponsorshipById = async (id, token) => {
    return await axiosGet(`/sponsorships/get/${id}`, {
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

//-----Sponsorships forms
export const getAllSponsorshipsForms = async (token) => {
    return await axiosGet('/sponsorships/forms', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createSponsorshipForm = async (data) => {
    return await axiosPost('/sponsorships/forms', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const acceptSponsorshipForm = async (id, token) => {
    return await axiosGet(`/sponsorships/forms/accept/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export const denySponsorshipForm = async (id, token) => {
    return await axiosDelete(`/sponsorships/forms/deny/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}