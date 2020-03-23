//src/services/msmoon.service.local.ts

import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { MSMoon, IMSMoonOutput } from '../../models/msmoon.model';
import { MSMoonServiceLocal } from "../local/msmoon.service.local";

export class MSMoonServiceAction {

    private msMoonServiceLocal: MSMoonServiceLocal;
    constructor() {
        this.msMoonServiceLocal = new MSMoonServiceLocal();
    }

    public welcomeMessage(req: Request, res: Response) {
        try {
            this.msMoonServiceLocal.welcomeMessage()
                .then(result => {
                    res.status(200).send(result);
                })
                .catch(error => {
                    res.status(404).send(String(error));
                });

        } catch (error) {
            res.send(error);
        }
    }

    public async asyncWelcomeMessage(req: Request, res: Response) {
        try {
            const result: String = await this.msMoonServiceLocal.asyncWelcomeMessage();
            res.status(200).send(result);
        } catch (error) {
            res.send(error);
        }
    }

    public async getAllMSMoon(req: Request, res: Response) {
        try {
            const msmoons: MongooseDocument[] = await this.msMoonServiceLocal.getAllMSMoon();
            res.json(msmoons);
        } catch (error) {
            res.send(error);
        }
    }

    public async addNewMSMoon(req: Request, res: Response) {
        try {
            const newMSMoon: MongooseDocument = await this.msMoonServiceLocal.addNewMSMoon(req.body);
            res.json(newMSMoon);
        } catch (error) {
            res.send(error);
        }
    }

    public async detailMSMoon(req: Request, res: Response) {

        try {
            const msmoonID = req.params.id;
            const detailMSMoon: MongooseDocument | null = await this.msMoonServiceLocal.detailMSMoon(msmoonID);
            if (detailMSMoon) {
                res.json(detailMSMoon);
            } else {
                res.json({ message: 'MSMoon not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }

    public async deleteMSMoon(req: Request, res: Response) {
        try {
            const msmoonID = req.params.id;
            const deletedMSMoon: MongooseDocument | null = await this.msMoonServiceLocal.deleteMSMoon(msmoonID);
            if (deletedMSMoon) {
                res.json(deletedMSMoon);
            } else {
                res.json({ message: 'MSMoon not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }

    //Updating a msmoon

    public async updateMSMoon(req: Request, res: Response) {
        try {
            const msmoonID = req.params.id;

            const updatedMSMoon: IMSMoonOutput | null = await this.msMoonServiceLocal.updateMSMoon({
                id: msmoonID,
                ...req.body
            });
            if (updatedMSMoon) {
                res.json(updatedMSMoon);
            } else {
                res.json({ message: 'MSMoon not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }
}