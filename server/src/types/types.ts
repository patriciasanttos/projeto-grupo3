import { Permission } from "../database/models"

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

export type AdoptionType = {
    animal_id: number,
    tutors_name: string,
    email: string,
    phone: number,
    address: string,
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
    id: number,
    image?: string,
    name: string,
    email: string,
    phone: number,
    password: string,
    permissions?: Permission[],
}