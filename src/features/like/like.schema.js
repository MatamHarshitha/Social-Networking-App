import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        // Indicates refer to the path to which the objectid refers to
        refPath:'on_model'
    },
    on_model:{
        type:String,
        enum:['Product','Category']
    }
}).pre("save",(next)=>{
    console.log("new likes coming in")
    next()
}).post("save",(doc)=>{
    console.log("Like is saved")
    console.log(doc)
   
}).pre("find",(next)=>{
    console.log("Retreving likes")
    next()
}).post("find",(docs)=>{
    console.log("Find is completed")
    console.log(docs)
   
})

