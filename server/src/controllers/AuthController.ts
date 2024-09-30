import { Request, Response } from 'express';

import adminsRepository from '../repositories/admins.repository';

const requestedProps = [
    "name",
    "email",
    "password",
    "phone",
    "permissions"
]

class AutoController {
    async getAll(req: Request, res: Response) {
        const response = await adminsRepository.getAllAdmins();

        res.status(response.code).json(response.data);
    }
    
    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adminsRepository.getAdminById(Number(id));

        res.status(response.code).json(response.data);
    }

    async verifyUser(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adminsRepository.verifyUser(Number(id));

        res.status(response.code).send();
    }

    async login(req: Request, res: Response){
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).json({ message: 'Missing authorization header' });

        const [ user, password ] = authorization.split(':');

        if (!password)
            return res.status(401).json({ message: 'Invalid authorization header' });

        const gettedUser = await adminsRepository.login({ user, password });

        return res.status(gettedUser.code).json(gettedUser.data);
    }

    async create(req: Request, res: Response) {
        const data = req.body

        if (!data)
            return res.status(400).json({ message: 'Invalid body request' });

        requestedProps.forEach(prop => {
            if (!data[prop])
                return res.status(400).json({ message: `Missing ${prop} property in the body request` });
        });

        const { name, email, password, phone, permissions, observation }: {
            name: string,
            email: string,
            password: string,
            phone: number,
            permissions: [],
            observation?: string
        } = { ...data };

        const response = await adminsRepository.createAdmin({ 
            name, 
            email, 
            password, 
            phone, 
            permissions,
            observation
        });

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        if (!req.body)
            return res.status(400).json({ message: 'Invalid body request' });

        const { id, name, email, password, phone, permissions, observation }: {
            id: number
            name?: string,
            email?: string,
            password?: string,
            phone?: number,
            permissions?: []
            observation?: string
        } = req.body;

        const response = await adminsRepository.updateAdmin({ 
            id, 
            name, 
            email, 
            password, 
            phone, 
            permissions,
            observation
        });

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adminsRepository.deleteAdmin(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AutoController();