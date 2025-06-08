import {Router} from "express";
const router = Router();

import * as middlewares from "../middlewares/auth.middleware"

import * as userController from "../controllers/users.controller";

router.post("/register", 
    userController.register
);



export const userRoutes: Router = router; 