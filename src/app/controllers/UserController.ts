import e, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from "../models/User";

class UserController {

    async index(req: Request, res: Response) {
        return res.json({ userId: req.userId })
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(User)
        const { name, email, password } = req.body;

        const userExists = await repository.findOne({ where: { email }});

        if(userExists) {
            return res.sendStatus(409);
        }

        const user = repository.create({ name, email, password });
        await repository.save(user);

        return res.json(user);
    }

    async update(req: Request, res: Response) {
        const repository = getRepository(User)
        const userData = req.body;

        const user = await repository.findOne({ where: { id: req.userId }});

        if(!user) {
            res.status(400).send('User not found');
        }

        const userUpdated = await repository.save({...user, ...userData})

        return res.json(userUpdated);
    }

}

export default new UserController();