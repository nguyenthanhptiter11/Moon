//src/main.usermgtcontroller.ts

import { MSMoonServiceAction } from "../services/action/msmoon.service.action";
import { UserServiceAction } from "../services/action/user.service.action";
import { Application } from "express";

export class UserMgtController {
    private msMoonServiceAction: MSMoonServiceAction;

    private userServiceAction: UserServiceAction;

    constructor(private app: Application) {
        this.msMoonServiceAction = new MSMoonServiceAction();
        this.userServiceAction = new UserServiceAction();
        this.routes();
    }

    public routes() {
        // this.app.route("/").get(async (req, res, next) => {
        //     return await this.msMoonServiceAction.welcomeMessage(req, res)
        // });
        this.app.route("/").get(this.msMoonServiceAction.welcomeMessage.bind(this.msMoonServiceAction));
        this.app.route("/async").get(this.msMoonServiceAction.asyncWelcomeMessage.bind(this.msMoonServiceAction));
        this.app.route("/msmoons").get(this.msMoonServiceAction.getAllMSMoon.bind(this.msMoonServiceAction));
        this.app.route("/msmoons").post(this.msMoonServiceAction.addNewMSMoon.bind(this.msMoonServiceAction));

        //Chaining our route

        this.app
            .route("/msmoons/:id")
            .get(this.msMoonServiceAction.detailMSMoon.bind(this.msMoonServiceAction))
            .delete(this.msMoonServiceAction.deleteMSMoon.bind(this.msMoonServiceAction))
            .put(this.msMoonServiceAction.updateMSMoon.bind(this.msMoonServiceAction));

        // user mgt
        this.app.route("/users").get(this.userServiceAction.getAllUser.bind(this.userServiceAction));
        this.app.route("/users").post(this.userServiceAction.addNewUser.bind(this.userServiceAction));

        //Chaining our route

        this.app
            .route("/users/:id")
            .get(this.userServiceAction.detailUser.bind(this.userServiceAction))
            .delete(this.userServiceAction.deleteUser.bind(this.userServiceAction))
            .put(this.userServiceAction.updateUser.bind(this.userServiceAction));
    }
}