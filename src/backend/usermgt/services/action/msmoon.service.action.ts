//src/services/msmoon.service.local.ts

import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { MSMoon } from '../../models/msmoon.model';
import { WELCOME_MESSAGE } from '../../../../constants/docktypeApi.constants';
import { DocktypeServiceLocal } from "../local/msmoon.service.local";

export class DocktypeServiceAction {

    private docktypeServiceLocal: DocktypeServiceLocal;
    constructor() {
        this.docktypeServiceLocal = new DocktypeServiceLocal();
    }

    public welcomeMessage(req: Request, res: Response) {
        try {
            this.docktypeServiceLocal.welcomeMessage()
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
            const result: String = await this.docktypeServiceLocal.asyncWelcomeMessage();
            res.status(200).send(result);
        } catch (error) {
            res.send(error);
        }
    }

    public async getAllMSMoon(req: Request, res: Response) {
        try {
            const msmoons: MongooseDocument[] = await this.docktypeServiceLocal.getAllMSMoon();
            res.json(msmoons);
        } catch (error) {
            res.send(error);
        }
    }

    public async addNewMSMoon(req: Request, res: Response) {
        try {
            const newMSMoon: MongooseDocument = await this.docktypeServiceLocal.addNewMSMoon(req.body);
            res.json(newMSMoon);
        } catch (error) {
            res.send(error);
        }
    }

    public async detailMSMoon(req: Request, res: Response) {

        try {
            const msmoonID = req.params.id;
            const detailMSMoon: MongooseDocument | null = await this.docktypeServiceLocal.detailMSMoon(msmoonID);
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
            const deletedMSMoon: MongooseDocument | null = await this.docktypeServiceLocal.deleteMSMoon(msmoonID);
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

            const deletedMSMoon: MongooseDocument | null = await this.docktypeServiceLocal.updateMSMoon({
                _id: msmoonID,
                ...req.body
            });
            if (deletedMSMoon) {
                res.json(deletedMSMoon);
            } else {
                res.json({ message: 'MSMoon not found :(' })
            }
        } catch (error) {
            res.send(error);
        }
    }
}