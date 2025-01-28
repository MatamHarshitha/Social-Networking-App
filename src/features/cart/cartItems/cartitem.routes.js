
import cartItemController from "./cartitem.controller.js";
// 1)Import express
import express from "express"
const CartItemController= new cartItemController
// 2)Initialize express router

const cartRouter=express.Router();

cartRouter.post("/",(req,res,next)=>{
CartItemController.add(req,res,next)
});
cartRouter.get("/",(req,res,next)=>{
    CartItemController.get(req,res,next)
    });
cartRouter.delete("/:id",(req,res,next)=>{
    CartItemController.delete(req,res,next)
    });
export default cartRouter;