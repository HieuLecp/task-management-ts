import {Request, Response} from "express";
import Task from "../models/tasks.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";
import { stat } from "fs";

// [GET] api/v1/tasks
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

// [GET] api/v1/tasks/:id
export const detail= async (req: Request, res: Response) => {
    try{
        const id= req.params.id;
        // console.log(id);
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

// [PATCH] api/v1/tasks/change-status/:id
export const changeStatus= async (req: Request, res: Response) => {
    try{
        const id: String = req.params.id;
        const status: String= req.body.status;
        
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

// [PATCH] api/v1/tasks/change-multi
export const changeMulti= async (req: Request, res: Response) => {
    
    try{
       const ids: string[] = req.body.ids;
       const key: string = req.body.key;
       const value: string = req.body.value

       switch (key){
            case "status":
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhập thành công!"
                })
                break;

            case "delete":
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: true,
                    deletedAt: new Date()
                })
                res.json({
                    code: 200,
                    message: "Xoá thành công!"
                })
                break;
            
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!"
                });
       }

    }catch(error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
};

// [POST] api/v1/tasks/create
export const create= async (req: Request, res: Response) => {
    
    try{
        // req.body.createdBy = req.user.id;
        const task = new Task(req.body);
        const data= await task.save();

        res.json({
            code: 200,
            message: "Tạo thành công",
            data: data
        });

    }catch(error) {
        res.json({
            code: 400,
            message: "Thất bại!"
        });
    }
};

// [PATCH] api/v1/tasks/edit/:id
export const edit= async (req: Request, res: Response) => {
    
    try{
       const id: string= req.params.id;

       await Task.updateOne({_id: id}, req.body)

       res.json({
        code: 200,
        message: "Cập nhập thành công",
    });

    }catch(error) {
        res.json({
            code: 400,
            message: "Thất bại!"
        });
    }
};