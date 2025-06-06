import { Express } from "express";

import { taskRoutes } from "./task.route";

// const authMiddleware= require("../middlewares/auth.middleware");


const mainV1Routes = (app : Express): void => {

    const version = "/api/v1";

    app.use(version + '/tasks', 
        // authMiddleware.requireAuth,
        taskRoutes
    );

}

export default mainV1Routes