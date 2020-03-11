//src/main.controller.ts

import { DocktypeService } from "./services/msmoon.service";
import { Application } from "express";

export class Controller {
    private docktypeService: DocktypeService;

    constructor(private app: Application) {
        this.docktypeService = new DocktypeService();
        this.routes();
    }

    public routes() {
        this.app.route("/").get(this.docktypeService.welcomeMessage);
        this.app.route("/msmoons").get(this.docktypeService.getAllMSMoon);
        this.app.route("/msmoons").post(this.docktypeService.addNewMSMoon);

        //Chaining our route

        this.app
            .route("/msmoons/:id")
            .get(this.docktypeService.detailMSMoon)
            .delete(this.docktypeService.deleteMSMoon)
            .put(this.docktypeService.updateMSMoon);
    }
}