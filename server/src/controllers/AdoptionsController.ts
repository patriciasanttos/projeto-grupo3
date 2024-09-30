import { Request, Response } from 'express';

import adoptionRepository from '../repositories/adoption.repository';

const requestedProps = [
    "tutors_name",
    "email",
    "phone",
    "address",
    "cpf",
    "animal_id"
]

class AdoptionsController {
    //-----Adoptions
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
        
        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!data[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        const { tutors_name, email, phone, address, cpf, animal_id }: {
            tutors_name: string,
            email: string,
            phone: number,
            address: string,
            cpf: number
            animal_id: number,
        } = { ...data };

        const response = await adoptionRepository.createAdoption({
            tutors_name,
            email,
            phone,
            address,
            cpf,
            animal_id
        });

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        if (!data.animal_id)
            return res.status(400).json({ message: 'Missing animal_id property in the body request' });

        const response = await adoptionRepository.updateAdoption(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adoptionRepository.deleteAdoption(Number(id));

        return res.status(response.code).json(response.data);
    }

    //-----Adoptions form
    async getAllForms(req: Request, res: Response) {
        const response = await adoptionRepository.getAllAdoptionsForms();

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

        const { tutors_name, email, phone, address, cpf, animal_id }: {
            tutors_name: string,
            email: string,
            phone: number,
            address: string,
            cpf: number
            animal_id: number,
        } = { ...data };

        const response = await adoptionRepository.createAdoptionForm({
            tutors_name,
            email,
            phone,
            address,
            cpf,
            animal_id
        });

        return res.status(response.code).json(response.data);
    }

    async acceptForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adoptionRepository.acceptAdoptionForm(Number(id));

        return res.status(response.code).json(response.data);
    }

    async denyForm(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adoptionRepository.denyAdoptionForm(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AdoptionsController();