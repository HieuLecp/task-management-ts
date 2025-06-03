import {Request, Response} from "express";
import Task from "../models/tasks.model";

export const index= async (req: Request, res: Response) => {

    interface Find {
        deleted: boolean,
        status?: String
    }

    const find: Find = {
        deleted: false,
    }

    // lọc theo trạng thái
    if(req.query.status){
        find.status= req.query.status.toString();
    }
    // end lọc theo trạng thái

    // sort
    const sort= {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey.toString()]= req.query.sortValue.toString();
    }
    // end sort

    const tasks= await Task.find(find)
    .sort(sort);

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