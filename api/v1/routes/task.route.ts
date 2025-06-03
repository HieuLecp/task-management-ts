import {Router} from "express";
const router = Router();

import * as controller from "../controllers/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", );

// router.patch("/change-multi", );

// router.post("/create", );

// router.patch("/edit/:id", );

// router.delete("/delete/:id",);

export const taskRoutes: Router = router; 