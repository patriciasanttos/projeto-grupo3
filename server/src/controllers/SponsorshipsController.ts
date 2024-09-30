import { Request, Response } from 'express';

import sponsorshipsRepository from '../repositories/sponsorships.repository';

const requestedProps = [
    "name",
    "email",
    "phone",
    "animal_id"
]

class SponsorshipsController {
    //-----Sponsorships
    async getAll(req: Request, res: Response) {
        const response = await sponsorshipsRepository.getAllSponsorships();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await sponsorshipsRepository.getSponsorshipById(Number(id));

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

        const { name, email, phone, animal_id, observation }: {
            name: string,
            email: string,
            phone: number,
            animal_id: number,
            observation: string,
        } = { ...data };

        const response = await sponsorshipsRepository.createSponsorship({
            name,
            email,
            phone,
            animal_id,
            observation
        });

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        if (!data.id)
            return res.status(400).json({ message: 'Invalid body request' });

        const { name, email, phone, id, observation }: {
            id: number,
            name: string,
            email: string,
            phone: number,
            observation: string,
        } = { ...data };

        const response = await sponsorshipsRepository.updateSponsorship({
            id,
            name,
            email,
            phone,
            observation
        })

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await sponsorshipsRepository.deleteSponsorship(Number(id));

        return res.status(response.code).json(response.data);
    }

    //-----Sponsorships forms
    async getAllForms(req: Request, res: Response) {
        const response = await sponsorshipsRepository.getAllSponsorshipsForms();

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

        const { name, email, phone, animal_id }: {
            name: string,
            email: string,
            phone: number,
            animal_id: number,
        } = { ...data };

        const response = await sponsorshipsRepository.createSponsorshipForm({
            name,
            email,
            phone,
            animal_id,
        });

        return res.status(response.code).json(response.data);
    }

    async acceptForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await sponsorshipsRepository.acceptSponsorshipForm(Number(id));

        return res.status(response.code).json(response.data);
    }

    async denyForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await sponsorshipsRepository.denySponsorshipForm(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new SponsorshipsController();