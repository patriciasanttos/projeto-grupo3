import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import animalsRepository from '../repositories/animals.repository';
import genFileName from '../utils/genFileName';

const requestedProps = [
    "image",
    "name",
    "species",
    "gender",
    "status",
    "size",
    "bay",
    "sector"
]

class AnimalController {
    async getAll(req: Request, res: Response) {
        const response = await animalsRepository.getAllAnimals();

        const animals = Object.entries(response.data).map(([ _, animal ]: any) => {
            let base64Image;
            if (animal.dataValues?.image) {
                const image: Buffer = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'animals', animal.dataValues.image));

                if (image)
                    base64Image = Buffer.from(image).toString('base64');
            }

            return {
                ...animal.dataValues,
                image: base64Image
            };
        })
      
        res.status(response.code).json(animals);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await animalsRepository.getAnimalById(Number(id));

        let base64Image;
        if (response.data?.image) {
            let image: Buffer = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'animals', response.data.image));
            
            if (image)
                base64Image = Buffer.from(image).toString('base64');
        }

        const animal = {
            ...response.data,
            image: base64Image
        };

        res.status(response.code).json(animal);
    }

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!body[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        let { 
            image,
            name, 
            species, 
            gender, 
            status, 
            size, 
            bay, 
            sector,
            color,
            vacine,
            castrated,
            age,
            temperament,
            observation
        }: {
            image: string
            name: string,
            species: string,
            gender: string,
            status: string,
            size: string,
            bay: number,
            sector: string,
            color?: string,
            vacine?: number,
            castrated?: boolean,
            age?: string,
            temperament?: string,
            observation?: string,
        } = {
            ...req.body,
            image: req.file?.originalname
        };

        if (image) {
            image = genFileName(req.file!.originalname);
        }

        const response = await animalsRepository.createAnimal({ 
            image,
            name, 
            species, 
            gender, 
            status, 
            size, 
            bay, 
            sector,
            color,
            vacine,
            castrated,
            age,
            temperament,
            observation
        });

        if (response.code === 201) {
            //-----Save image
            if (image) {
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'animals', image), imageBuffer, 
                    (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(response.code).json({ message: 'Animal created, but image was not saved' });
                        }
                    }
                );
            }

            return res.status(response.code).json(response.data);
        }

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        if (!req.body)
            return res.status(400).json({ message: 'Invalid body request' });

        const {
            id, 
            image,
            name, 
            species, 
            gender, 
            status, 
            size, 
            bay, 
            sector,
            color,
            vacine,
            castrated,
            age,
            temperament,
            observation
        }: {
            id: number,
            image: string,
            name: string,
            species: string,
            gender: string,
            status: string,
            size: string,
            bay: number,
            sector: string,
            color?: string,
            vacine?: number,
            castrated?: boolean,
            age?: string,
            temperament?: string,
            observation?: string,
        } = {
            ...req.body,
            image: req.file?.originalname
        };

        if (!id)
            return res.status(400).json({ message: 'Missing id property in the body request' });

        const response = await animalsRepository.updateAnimal({ 
            id,
            image,
            name, 
            species, 
            gender, 
            status, 
            size, 
            bay, 
            sector,
            color,
            vacine,
            castrated,
            age,
            temperament,
            observation
        });

        if (response.code === 200) {
            if (image) {
                //-----Remove old image if exists
                const oldAnimal = await animalsRepository.getAnimalById(id);
                const oldImage = oldAnimal.data!.image;
                fs.readFile(path.join(__dirname, '..', 'assets', 'images', 'animals', oldImage), (err, file) => {
                    if (err || !file)
                        return;

                    fs.rmSync(path.join(__dirname, '..', 'assets', 'images', 'animals', oldImage))
                });

                //-----Save new image
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'animals', image), imageBuffer, 
                    (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(response.code).json({ message: 'Animal created, but image was not saved' });
                        }
                    }
                );

                return res.status(response.code).json(response.data);
            }
        }

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await animalsRepository.deleteAnimal(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AnimalController();