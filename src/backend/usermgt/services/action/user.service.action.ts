//src/services/user.service.local.ts

import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { User, IUser } from '../../models/user.model';
import { UserServiceLocal } from "../local/user.service.local";

export class UserServiceAction {

    private userServiceLocal: UserServiceLocal;
    constructor() {
        this.userServiceLocal = new UserServiceLocal();
    }

    public async getAllUser(req: Request, res: Response) {
        try {
            const users: MongooseDocument[] = await this.userServiceLocal.getAllUser();
            res.json(users);
        } catch (error) {
            res.send(error);
        }
    }

    public async addNewUser(req: Request, res: Response) {
        try {
            const newUser: MongooseDocument = await this.userServiceLocal.addNewUser(req.body);
            res.json(newUser);
        } catch (error) {
            res.send(error);
        }
    }

    public async detailUser(req: Request, res: Response) {

        try {
            const userID = req.params.id;
            const detailUser: MongooseDocument | null = await this.userServiceLocal.detailUser(userID);
            if (detailUser) {
                res.json(detailUser);
            } else {
                res.json({ message: 'User not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const userID = req.params.id;
            const deletedUser: MongooseDocument | null = await this.userServiceLocal.deleteUser(userID);
            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.json({ message: 'User not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }

    //Updating a user

    public async updateUser(req: Request, res: Response) {
        try {
            const userID = req.params.id;

            const updatedUser: IUser | null = await this.userServiceLocal.updateUser({
                id: userID,
                ...req.body
            });
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.json({ message: 'User not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }
}