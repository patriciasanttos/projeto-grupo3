import { Request, Response } from 'express';
import adminsRepository from '../repositories/admins.repository';

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import genFileName from '../utils/genFileName';

class AutoController {
    async getAll(req: Request, res: Response) {
        const response = await adminsRepository.getAllAdmins();

        const admins = Object.entries(response.data).map((admin: any[]) => {
            const image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'administrators', admin[1].image));
            
            let base64Image = '';
            if (image)
                base64Image = Buffer.from(image).toString('base64');

            return {
                ...admin[1],
                image: base64Image || response.data
            };
        })

        res.status(response.code).json(admins);
    }
    
    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response: any = await adminsRepository.getAdminById(Number(id));
        console.log(response.data)

        const image = fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'administrators', response.data.image));
            
        let base64Image = '';
        if (image)
            base64Image = Buffer.from(image).toString('base64');

        const administrator = {
            ...response.data,
            image: base64Image || response.data
        };

        res.status(response.code).json(administrator);
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
        const data = {
            ...req.body,
            image: req.file?.originalname
        };
        if (data.image) {
            data.image = genFileName(req.file!.originalname);
        }

        if (Object.keys(data).length === 0 || data.name === undefined || data.email === undefined || data.phone === undefined || data.password === undefined || data.permissions === undefined)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await adminsRepository.createAdmin(data);

        if (response.code === 201) {
            //-----Salvar imagem na API
            if (data.image) {
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'administrators', data.image), imageBuffer, (err) => {
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