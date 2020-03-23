//src/app.ts

import express, { Application } from 'express';
import { UserMgtController } from './backend/usermgt/api/main.usermgtcontroller';

//importing our MONGO_URL constant
import { MONGO_URL } from './constants/msmoonapi.constants';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public app: Application;
    public userMgtControllerRegister: UserMgtController;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();

        this.userMgtControllerRegister = new UserMgtController(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;

        //using our constant instead of the hard coded String
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true
        });
    }
}

export default new App().app;