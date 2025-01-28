import CartItemModel from "./cartitem.model.js";
//  import CartItemRepository from "./cartitem.repository.js"
import CartItemRepository from "./cartitem.repository.js";


export default class cartItemController{
    constructor(){
        this.cartitemRepository=new CartItemRepository
    }

   async add(req,res){
    try{
        const {productId,quantity}=req.body;
        const userID=req.userID;
        const item=await this.cartitemRepository.add(productId,userID,quantity)
        res.status(400).send("cart is updated")
    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
    }
}
   async get(req,res){
    try{
        const userID=req.userID;
        console.log(userID)
        console.log(typeof userID, userID)
        const items=await this.cartitemRepository.getItem(userID)
        console.log(items)
        res.status(200).send(items)
    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
    }
}
    delete(req,res){
        const userID=req.userID;
        const cartItemID=req.params.id;
        const isDeleted=this.cartitemRepository.delete(userID,cartItemID);
        if(!isDeleted){
            return res.status(404).send(error)
        }
        return res.status(200).send("Cart item is removed")
    }

}