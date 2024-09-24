import { Request, Response } from 'express';

import sponsorshipsRepository from '../repositories/sponsorships.repository';

class SponsorshipsController {
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

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.animal_id === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await sponsorshipsRepository.createSponsorship(data);

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await sponsorshipsRepository.updateSponsorship(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await sponsorshipsRepository.deleteSponsorship(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new SponsorshipsController();