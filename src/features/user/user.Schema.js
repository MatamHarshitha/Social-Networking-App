// In Mongoose, a schema defines the structure of the documents within a MongoDB collection.
//  It acts as a blueprint for the data, specifying the types, default values, validations, and constraints for each field in the document.

import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: {type: String, 
        validate:{
            validator: function(value){
                // return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)/
                /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
            },
            message:"Password should be between 8-12 charachetrs and have a special character"
        }
    },
     type:{ type: String, enum: ['Customer', 'Seller']}
})