import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import volunteerRepository from '../repositories/volunteer.repository';
import genFileName from '../utils/genFileName';

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
        const data = {
            ...req.body,
            image: req.file?.originalname
        };
        if (data.image) {
            data.image = genFileName(req.file!.originalname);
        }

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.availability === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await volunteerRepository.createVolunteer(data);

        if (response.code === 201) {
            //-----Salvar imagem na API
            if (data.image) {
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'volunteers', data.image), imageBuffer, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(response.code).json({ message: 'Registred, but image was not saved' });
                    }
                });
            }

            return res.status(response.code).json(response.data);
        };

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