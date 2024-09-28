import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import volunteersRepository from '../repositories/volunteers.repository';
import genFileName from '../utils/genFileName';

class VolunteersController {
    async getAll(req: Request, res: Response) {
        const response = await volunteersRepository.getAllVolunteers();

        const volunteers = Object.entries(response.data).map((volunteer: any[]) => {

            let image: Buffer;
            let base64Image;
            if (volunteer[1].dataValues.image) {
                image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'animals', volunteer[1].dataValues.image));
            
                if (image)
                    base64Image = Buffer.from(image).toString('base64');
            }

            return {
                ...volunteer[1].dataValues,
                image: base64Image
            };
        })

        res.status(response.code).json(volunteers);
    }

    async getAllForms(req: Request, res: Response) {
        const response = await volunteersRepository.getAllVolunteersForms();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await volunteersRepository.getVolunteerById(Number(id));

        let image: Buffer;
        let base64Image;
        if (response.data.image) {
            image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'volunteers', response.data.image));
            
            if (image)
                base64Image = Buffer.from(image).toString('base64');
        }

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

        const response = await volunteersRepository.createVolunteer(data);

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

    async createForm(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.availability === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await volunteersRepository.createVolunteerForm(data);

        return res.status(response.code).json(response.data);
    }

    async acceptForm(req: Request, res: Response) {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: 'Invalid id' });

        const response = await volunteersRepository.acceptVolunteerForm(Number(id));

        return res.status(response.code).json(response.data);
    }

    async denyForm(req: Request, res: Response) {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: 'Invalid id' });

        const response = await volunteersRepository.denyVolunteerForm(Number(id));

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await volunteersRepository.updateVolunteer(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await volunteersRepository.deleteVolunteer(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new VolunteersController();