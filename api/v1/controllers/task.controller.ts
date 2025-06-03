import {Request, Response} from "express";
import Task from "../models/tasks.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index= async (req: Request, res: Response) => {

    interface Find {
        deleted: boolean,
        status?: String,
        title?: RegExp
    }

    const find: Find = {
        deleted: false,
    }

    // lọc theo trạng thái
    if(req.query.status){
        find.status= req.query.status.toString();
    }
    // end lọc theo trạng thái

    // search
    const objectSearch = searchHelper(req.query);
    // console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // end search 

    // pagination
    const countTask = await Task.countDocuments(find);

        let objectPagination = paginationHelper(
            {
                currentPage: 1,
                limitItems : 3
            },
            req.query,
            countTask
        )
    // end pagination

    // sort
    const sort= {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey.toString()]= req.query.sortValue.toString();
    }
    // end sort

    const tasks= await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

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
};

// [PATCH] api/v1/task/change-status/:id
export const changeStatus= async (req: Request, res: Response) => {
    
    try{
        const id= req.params.id;
        const status= req.body.status;
        
        await Task.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Cập nhập trạng thái thành công!"
        });
    }catch(error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
};