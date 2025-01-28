import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
// const UserModel = mongoose.model('User', userSchema)
const UserModel=mongoose.model("User",userSchema);

export default class UserRepository{

    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            // This line attempts to save the newUser document to the MongoDB database.
            // In short, Mongoose connects to MongoDB via mongoose.connect(), and you can save data like user signup to MongoDB by using user.save().
            return newUser.toJSON();
        }
        catch(err){
            if(err instanceof mongoose.Error.ValidationError){
                throw err
              }
              else{
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
              }
        }
    }

    async signIn(email, password){
        try{
           return await UserModel.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
      }

      async resetPassword(userID, newPassword){
        try{
            let user=await UserModel.findById(userID);
            if(user){
                user.password=newPassword;
                user.save()
            }else{
                throw new Error("User not Found")
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
      }
}
}