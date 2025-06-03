import {Request, Response} from "express";
import Task from "../models/tasks.model";

export const index= async (req: Request, res: Response) => {
    const tasks= await Task.find({
        deleted: false
    })

    res.json(tasks);
}

export const detail= async (req: Request, res: Response) => {
    try{
        const id= req.params.id;

        const tasks= await Task.findOne({
            _id: id,
            deleted: false
        });
    
        // console.log(tasks);
    
        res.json(tasks); 
    }catch(error) {
        res.json("Không tìm thấy");
    }
}