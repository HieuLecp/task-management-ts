import {Request, Response} from "express"
import User from "../models/users.model"

import * as generateHelper from "../../../helpers/generate"

import md5 from "md5";

// [POST] api/v1/users/register
export const register= async (req: Request, res: Response) => {
    try{
        req.body.password= md5(req.body.password);
        req.body.tokenUser = generateHelper.generateRandomString(20); 
        
        const exitsEmail= await User.findOne({
            email: req.body.email,
            deleted: false
        });
        if(exitsEmail){
            res.json({
                code: 400,
                message: " Email đã tồn tại"
            });
        } else{
            const user= new User(req.body);
            await user.save();

            const token= user.token;
            res.cookie("token", token);

            res.json({
                code: 200,
                message: "Tạo thành công",
                token: token
            });
        }

    }catch(error) {
        res.json({
            code: 400,
            message: "Thất bại!"
        });
    }
};