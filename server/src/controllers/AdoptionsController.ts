import { Request, Response } from 'express';

import adoptionRepository from '../repositories/adoption.repository';

class AdoptionsController {
    async getAll(req: Request, res: Response) {
        const response = await adoptionRepository.getAllAdoptions();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adoptionRepository.getAdoptionById(Number(id));

        res.status(response.code).json(response.data);
    }

    async create(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0 || data.tutors_name === undefined || data.email === undefined || data.phone === undefined || data.address === undefined || data.animal_id === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await adoptionRepository.createAdoption(data);

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await adoptionRepository.updateAdoption(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adoptionRepository.deleteAdoption(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AdoptionsController();