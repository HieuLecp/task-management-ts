import {Router} from "express";
const router = Router();

import * as controller from "../controllers/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus );

router.patch("/change-multi", controller.changeMulti);

router.post("/create", controller.create);

// router.patch("/edit/:id", );

// router.delete("/delete/:id",);

export const taskRoutes: Router = router; 