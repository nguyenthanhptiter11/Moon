//src/services/msmoon.service.local.ts

import { MSMoon, IMSMoon, IMSMoonInput, IMSMoonOutput } from '../../models/msmoon.model';
import { WELCOME_MESSAGE, WELCOME_MESSAGE_ERR } from '../../../../constants/msmoonapi.constants';

export class MSMoonServiceLocal {
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

    public async updateMSMoon(msmoon: IMSMoonInput) {

        try {

            const updatedMSMoon: IMSMoon | null = await MSMoon.findByIdAndUpdate(
                msmoon['id'],
                msmoon
            );
            if (updatedMSMoon) {
                const r:IMSMoonOutput = {

                    ... updatedMSMoon._doc
                }
                return r
            } else {
                return null
            }
        } catch (err) {

            throw err
        }
    }
}