import { Permission } from "../database/models"

export type RepositoryResponse = {
    code: number;
    data?: {};
}

export type AnimalType = {
    id?: number,
    image: string,
    name: string,
    species: string,
    race?: string
    size: string,
    color?: string,
    vacine?: number,
    castrated?: boolean,
    age?: string,
    gender?: string,
    temperament?: string,
    bay?: number,
    sector?: string,
    status: string,
    observation?: string,
}

export type SponsorshipType = {
    id?: number,
    name: string,
    email: string,
    phone: number,
    animal_id?: number,
}

export type SponsorshipFormType = {
    id?: number,
    name: string,
    email: string,
    phone: number,
    animal_id: number,
}

export type AdoptionType = {
    id?: number,
    tutors_name: string,
    email: string,
    phone: number,
    address: string,
    cpf: number,
    animal_id?: number,
    created_at?: string,
    updated_at?: string,
}

export type AdoptionFormType = {
    id?: number,
    animal_id: number,
    tutors_name: string,
    email: string,
    phone: number,
    address: string,
    cpf: number,
    created_at?: string,
    updated_at?: string,
}

export type VolunteerType = {
    id: number,
    image?: string,
    name: string,
    responsible_name?: string,
    email: string,
    phone: number,
    address: string,
    availability: string,
    study_schedule?: string,
    profession?: string,
    sector: string,
    state: string,
    observation?: string,
    created_at?: string,
    updated_at?: string,
}

export type AdminType = {
    id?: number,
    name: string,
    email: string,
    phone: number,
    password: string,
    permissions?: Permission[],
}