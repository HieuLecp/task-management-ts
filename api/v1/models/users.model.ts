import mongoose, { model, mongo } from "mongoose";


const usersSchema= new mongoose.Schema(
    {
        fullName : String,
        password: String,
        email: String,
        token: String,
        phone: String,
        avatar: String,
        address: String,
        status: {
            type: String,
            default: "active"
        },
        deleted : {
            type: Boolean,
            default: false,
        },
    }, 
    {
        timestamps : true
    }
);

const User= mongoose.model('User', usersSchema, "users");

export default User;