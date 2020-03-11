//src/services/msmoon.service.ts

import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { MSMoon } from '../models/msmoon.model';
import { WELCOME_MESSAGE } from '../constants/docktypeApi.constants';

export class DocktypeService {
    public welcomeMessage(req: Request, res: Response) {
        res.status(200).send(WELCOME_MESSAGE);
    }

    public getAllMSMoon(req: Request, res: Response) {
        MSMoon.find({}, (error: Error, msmoons: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            res.json(msmoons);
        });
    }

    public addNewMSMoon(req: Request, res: Response) {
        const newMSMoon = new MSMoon(req.body);
        newMSMoon.save((error: Error, msmoon: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            res.json(msmoon);
        });
    }

    public detailMSMoon(req: Request, res: Response) {
        const msmoonID = req.params.id;
        MSMoon.findById(msmoonID, (error: Error, msmoon: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            const message = msmoon || {message: 'MSMoon not found :('};
            res.json(message);
        });
    }

    public deleteMSMoon(req: Request, res: Response) {
        const msmoonID = req.params.id;
        MSMoon.findByIdAndDelete(msmoonID, (error: Error, deleted: any) => {
            if (error) {
                res.send(error);
            }
            const message = deleted ? 'Deleted successfully' : 'MSMoon not found :(';
            res.send(message);
        });
    }

    //Updating a msmoon

    public updateMSMoon(req: Request, res: Response) {
        const msmoonId = req.params.id;
        MSMoon.findByIdAndUpdate(
            msmoonId,
            req.body,
            (error: Error, msmoon: any) => {
                if (error) {
                    res.send(error);
                }
                const message = msmoon
                    ? 'Updated successfully'
                    : 'MSMoon not found :(';
                res.send(message);
            }
        );
    }
}