import axiosClient from '../axiosClient';

const axiosGet = async (url) => {
    const res = await axiosClient.get(url);
    return res.data;
};

const axiosPost = async (url, data) => {
    const res = await axiosClient.post(url, data);
    return res.data;
};

const axiosPut = async (url, data) => {
    const res = await axiosClient.put(url, data);
    return res.data;
};

const axiosDelete = async (url) => {
    const res = await axiosClient.delete(url);
    return res.data;
};

const axiosMethods = {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
}
 
export default axiosMethods;