//src/services/msmoon.service.local.ts

import { MongooseDocument } from 'mongoose';
import { MSMoon, IMSMoon } from '../../models/msmoon.model';
import { WELCOME_MESSAGE, WELCOME_MESSAGE_ERR } from '../../../../constants/docktypeApi.constants';

export class DocktypeServiceLocal {
    public welcomeMessage() {
        return new Promise((resolve, reject) => setTimeout(() => {
            //resolve(WELCOME_MESSAGE)
            reject(WELCOME_MESSAGE_ERR)
        }, 500))
    }

    public async asyncWelcomeMessage() {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            return WELCOME_MESSAGE;
        } catch (err) {

            throw err
        }
    }

    public async getAllMSMoon() {

        try {

            const msmoons = MSMoon.find()
            return msmoons;
        } catch (err) {

            throw err
        }
    }

    public async addNewMSMoon(msmoon: IMSMoon) {

        try {

            const newMSMoon = new MSMoon(msmoon);
            await newMSMoon.save();
            return newMSMoon

        } catch (err) {

            throw err
        }
    }

    public async detailMSMoon(msmoonID: String) {

        try {

            const newMSMoon = MSMoon.findById(msmoonID);
            return newMSMoon

        } catch (err) {

            throw err
        }
    }

    public async deleteMSMoon(msmoonID: String) {
        try {

            const deletedMSMoon = await MSMoon.findByIdAndDelete(msmoonID);
            return deletedMSMoon

        } catch (err) {

            throw err
        }
    }

    //Updating a msmoon

    public async updateMSMoon(msmoon: IMSMoon) {

        try {

            const updatedMSMoon = await MSMoon.findByIdAndUpdate(
                msmoon['_id'],
                msmoon
            );
            return updatedMSMoon
        } catch (err) {

            throw err
        }
    }
}