// mongoose.connect(): This establishes a connection to the MongoDB server. In your case, it connects to a local MongoDB instance on the database named postaway2. The useNewUrlParser: true and useUnifiedTopology: true options are used to handle deprecation warnings related to the MongoDB driver.

// Success: If the connection is successful, it logs "Mongoose is connected" to the console.

// Failure: If the connection fails, it logs the error to the console.

// When you call something like new UserModel(user), it creates a new instance of the User model. Here's how it works when a user signs up:

// Create a New User: When you collect the user data, for example, from req.body, you create a new instance of the UserModel:

// await user.save();
// This sends the new user data to the MongoDB database. Mongoose handles saving the document (record) to the users collection.
// If the email already exists (due to the unique: true constraint in the schema), Mongoose will throw a validation error.
// If the save is successful, the user data is stored in MongoDB.

// In short, Mongoose connects to MongoDB via mongoose.connect(), and you can save data like user signup to MongoDB by using user.save().
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { categorySchema } from "../features/product/category.schema.js";

const url=process.env.DB_URL

export const connectUsingMongoose=async()=>{
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Mongoose is connected")
        addCategories();
    }
    catch(err){
        console.log(err)
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added");
}
