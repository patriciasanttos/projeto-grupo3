import { Request, Response } from 'express';

import volunteerRepository from '../repositories/volunteer.repository';

class VolunteersController {
    async getAll(req: Request, res: Response) {
        const response = await volunteerRepository.getAllVolunteers();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteerRepository.getVolunteerById(Number(id));

        res.status(response.code).json(response.data);
    }

    async create(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.availability === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await volunteerRepository.createVolunteer(data);

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await volunteerRepository.updateVolunteer(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteerRepository.deleteVolunteer(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new VolunteersController();