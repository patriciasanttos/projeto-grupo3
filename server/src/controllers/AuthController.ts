import { Request, Response } from 'express';
import adminsRepository from '../repositories/admins.repository';
import Admin from '../database/models/Admin';

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

    async login(req: Request, res: Response){
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).json({ message: 'Missing authorization header' });

        const [ user, password ] = authorization.split(':');

        if (!password)
            return res.status(401).json({ message: 'Missing password in authorization header' });

        const gettedUser = await adminsRepository.login({ user, password });

        return res.status(gettedUser.code).json(gettedUser.data);
    }

    async register(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.password === undefined || data.role === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await adminsRepository.createAdmin(data);

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await adminsRepository.updateAdmin(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await adminsRepository.deleteAdmin(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AutoController();