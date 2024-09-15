import axiosClient from '../axiosClient';

export const axiosGet = async (url) => {
    const res = await axiosClient.get(url);
    return res.data;
};

export const axiosPost = async (url, data) => {
    const res = await axiosClient.post(url, data);
    return res.data;
};

export const axiosPut = async (url, data) => {
    const res = await axiosClient.put(url, data);
    return res.data;
};

export const axiosDelete = async (url) => {
    const res = await axiosClient.delete(url);
    return res.data;
};