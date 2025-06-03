import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("connect Success!")
    } catch(error) {
        console.log("connet Faild!")
    }
}
