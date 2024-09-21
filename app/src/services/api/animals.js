import { axiosGet, axiosPost, axiosPut, axiosDelete } from './index';

export const getAllAnimals = async () => {
    return await axiosGet('/animals');
}

export const getAnimalById = async (id) => {
    return await axiosGet(`/animals/${id}`);
}

export const createAnimal = async (data) => {
    return await axiosPost('/animals', data);
}

export const updateAnimal = async (data) => {
    return await axiosPut('/animals', data);
}

export const deleteAnimal = async (id) => {
    return await axiosDelete(`/animals/${id}`);
}