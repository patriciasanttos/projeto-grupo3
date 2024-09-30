import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import animalsRepository from '../repositories/animals.repository';
import genFileName from '../utils/genFileName';

const requestedProps = [
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

        const animals = await Promise.all(
            Object.entries(response.data).map(async ([ _, animal ]: any) => {
                let animalData = { ...animal.dataValues };
    
                try {
                    if (animal.dataValues?.image) {
                        const file = await fs.promises.readFile(path.join(__dirname, '..', 'assets', 'images', 'animals', animal.dataValues?.image));
        
                        if (file)
                            animalData = {
                            ...animal.dataValues,
                            image: Buffer.from(file).toString('base64')
                        };
                    }
        
                    return animalData;
                } catch (error) {
                    return animalData;
                }
            })
        )
      
        res.status(response.code).json(animals);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await animalsRepository.getAnimalById(Number(id));

        let base64Image;
        if (response.data?.image) {
            fs.readFile(path.join(__dirname, '..', 'assets', 'images', 'animals', response.data.image), (err, file) => {
                if (err)
                    return;

                return base64Image = Buffer.from(file).toString('base64');
            });
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

        if (!req.file)
            return res.status(400).json({ message: `Missing image property in the body request` });

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
            observation,
            race
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
            race?: string
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
            observation,
            race
        });

        if (response.code === 201) {
            //-----Save image
            if (image) {
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'animals', image), imageBuffer, 
                    (err) => {
                        if (err) {
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

        let {
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
            observation,
            race
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
            race?: string
        } = {
            ...req.body,
            image: req.file?.originalname
        };

        if (!id)
            return res.status(400).json({ message: 'Missing id property in the body request' });

        if (image) {
            image = genFileName(req.file!.originalname);
        }

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
            observation,
            race
        });

        if (response.code === 200) {
            if (image) {
                //-----Remove old image if exists
                const oldAnimal: any = await animalsRepository.getAnimalById(id);
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