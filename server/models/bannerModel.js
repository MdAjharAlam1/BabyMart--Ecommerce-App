import mongoose, { Schema } from "mongoose";

const bannerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    startFrom:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    bannerType:{
        type:String,
        required:true
    }
},{timestamps:true})

const  bannerModel = mongoose.model("Banner", bannerSchema)
export default bannerModel