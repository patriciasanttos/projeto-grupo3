import axiosClient from '../axiosClient';

export const axiosGet = async (url, headers) => {
    const res = await axiosClient.get(url, headers,);
    return res.data;
};

export const axiosPost = async (url, data, headers) => {
    const res = await axiosClient.post(url, data, headers);
    return res.data;
};

export const axiosPut = async (url, data, headers) => {
    const res = await axiosClient.put(url, data, headers)
        .them((req, res) => {
            console.log('Response: ' + req)
        });
    return res.data;
};

export const axiosDelete = async (url, headers) => {
    const res = await axiosClient.delete(url, headers);
    return res.data;
};