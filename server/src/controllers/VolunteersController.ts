import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import volunteerRepository from '../repositories/volunteer.repository';
import genFileName from '../utils/genFileName';

class VolunteersController {
    async getAll(req: Request, res: Response) {
        const response: any = await volunteerRepository.getAllVolunteers();

        const volunteers = Object.entries(response.data).map((volunteer: any[]) => {
            const image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'animals', volunteer[1].dataValues.image));
            
            let base64Image = '';
            if (image)
                base64Image = Buffer.from(image).toString('base64');

            return {
                ...volunteer[1].dataValues,
                image: base64Image
            };
        })

        res.status(response.code).json(volunteers);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await volunteerRepository.getVolunteerById(Number(id));

        const image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'volunteers', response.data.image));
            
        let base64Image = '';
        if (image)
            base64Image = Buffer.from(image).toString('base64');

        const volunteer = {
            ...response.data,
            image: base64Image
        };

        res.status(response.code).json(volunteer);
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