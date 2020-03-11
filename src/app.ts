//src/app.ts

import express, { Application } from 'express';
import { Controller } from './main.controller';

//importing our MONGO_URL constant
import { MONGO_URL } from './constants/docktypeApi.constants';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public app: Application;
    public docktypeController: Controller;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();

        this.docktypeController = new Controller(this.app);
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