import { ObjectId } from "bson";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

 class CartItemRepository{
    constructor(){
        this.collection="cartItems";
    }
    async add(productId,userID,quantity){
        try{
        const db=getDB();
       const collection= db.collection(this.collection);
       return await collection.updateOne({productId:new ObjectId(productId),userID:new ObjectId(userID)},
       {$inc:{quantity:quantity}},
    //    upsert finds and updates the data if doc exists,if no doc it will create doc
       {upsert:true})
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}
async getItem(userID){
    try{
        const db=getDB();
       const collection= db.collection(this.collection); 
       return await collection.find({userID: new ObjectId(userID)}).toArray()
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}
async delete(userID,cartItemID){
    try{
        const db=getDB();
        const collection= db.collection(this.collection); 
        // useriD bcoz to ensure users are deleting there own cart items not others cart items
        const result=await collection.deleteOne({_id: new ObjectId(cartItemID),userID:new ObjectId(userID)})
        return result.deletedCount>0;
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
}
}
 }

export default CartItemRepository