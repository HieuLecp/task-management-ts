import { Express } from "express";

import { taskRoutes } from "./task.route";
import { userRoutes } from "./users.route";

// const authMiddleware= require("../middlewares/auth.middleware");


const mainV1Routes = (app : Express): void => {

    const version = "/api/v1";

    app.use(version + '/tasks', 
        // authMiddleware.requireAuth,
        taskRoutes
    );

    app.use(version + '/users', 
        // authMiddleware.requireAuth,
        userRoutes
    );

}

export default mainV1Routes