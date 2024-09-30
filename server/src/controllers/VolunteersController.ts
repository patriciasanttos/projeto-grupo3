import { Request, Response } from 'express';

import volunteersRepository from '../repositories/volunteers.repository';

const requestedProps = [
    "name",
    "email",
    "phone",
    "address",
    "availability",
    "profession",
    "sector",
    "state",
]

class VolunteersController {
    //-----Volunteers
    async getAll(req: Request, res: Response) {
        const response = await volunteersRepository.getAllVolunteers();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await volunteersRepository.getVolunteerById(Number(id));

        res.status(response.code).json(response.data);
    }

    async create(req: Request, res: Response) {
        const data = req.body;
        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!data[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        const { name, email, phone, address, availability, profession, sector, state, observation }: {
            name: string,
            email: string,
            phone: number,
            address: string,
            availability: string,
            profession: string,
            sector: string,
            state: string,
            observation?: string
        } = { ...data };

        const response = await volunteersRepository.createVolunteer({
            name,
            email,
            phone,
            address,
            availability,
            profession,
            sector,
            state,
            observation
        });

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;
        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!data[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        const { name, email, phone, address, availability, profession, sector, state, observation }: {
            name: string,
            email: string,
            phone: number,
            address: string,
            availability: string,
            profession: string,
            sector: string,
            state: string,
            observation?: string
        } = { ...data };

        const response = await volunteersRepository.updateVolunteer({
            name,
            email,
            phone,
            address,
            availability,
            profession,
            sector,
            state,
            observation
        });

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteersRepository.deleteVolunteer(Number(id));

        return res.status(response.code).json(response.data);
    }

    //-----Volunteers forms
    async getAllForms(req: Request, res: Response) {
        const response = await volunteersRepository.getAllVolunteersForms();

        res.status(response.code).json(response.data);
    }
    
    async createForm(req: Request, res: Response) {
        const data = req.body;
        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!data[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        const { name, email, phone, address, availability, profession, sector, state }: {
            name: string,
            email: string,
            phone: number,
            address: string,
            availability: string,
            profession: string,
            sector: string,
            state: string,
        } = { ...data };

        const response = await volunteersRepository.createVolunteerForm({
            name,
            email,
            phone,
            address,
            availability,
            profession,
            sector,
            state
        });

        return res.status(response.code).json(response.data);
    }

    async acceptForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteersRepository.acceptVolunteerForm(Number(id));

        return res.status(response.code).json(response.data);
    }

    async denyForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteersRepository.denyVolunteerForm(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new VolunteersController();