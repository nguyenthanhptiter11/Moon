//src/main.usermgtcontroller.ts

import { DocktypeServiceAction } from "../services/action/msmoon.service.action";
import { Application } from "express";

export class UserMgtController {
    private docktypeServiceAction: DocktypeServiceAction;

    constructor(private app: Application) {
        this.docktypeServiceAction = new DocktypeServiceAction();
        this.routes();
    }

    public routes() {
        // this.app.route("/").get(async (req, res, next) => {
        //     return await this.docktypeServiceAction.welcomeMessage(req, res)
        // });
        this.app.route("/").get(this.docktypeServiceAction.welcomeMessage.bind(this.docktypeServiceAction));
        this.app.route("/async").get(this.docktypeServiceAction.asyncWelcomeMessage.bind(this.docktypeServiceAction));
        this.app.route("/msmoons").get(this.docktypeServiceAction.getAllMSMoon.bind(this.docktypeServiceAction));
        this.app.route("/msmoons").post(this.docktypeServiceAction.addNewMSMoon.bind(this.docktypeServiceAction));

        //Chaining our route

        this.app
            .route("/msmoons/:id")
            .get(this.docktypeServiceAction.detailMSMoon.bind(this.docktypeServiceAction))
            .delete(this.docktypeServiceAction.deleteMSMoon.bind(this.docktypeServiceAction))
            .put(this.docktypeServiceAction.updateMSMoon.bind(this.docktypeServiceAction));
    }
}