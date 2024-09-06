import { Request, Response } from 'express';

import animalsRepository from '../repositories/animals.repository';

class AnimalController {
    async getAll(req: Request, res: Response) {
        const response = await animalsRepository.getAllAnimals();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await animalsRepository.getAnimalById(Number(id));

        res.status(response.code).json(response.data);
    }

    async create(req: Request, res: Response) {
        const data = req.body;

        if (data.name === undefined || data.species === undefined || data.status === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await animalsRepository.createAnimal(data);

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        const response = await animalsRepository.updateAnimal(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await animalsRepository.deleteAnimal(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AnimalController();