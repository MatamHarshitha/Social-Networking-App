import "./env.js"
// 1)import express
import  express from "express";
import swagger from 'swagger-ui-express';
import ProductController from "./src/features/product/product.controller.js";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
//  import cartRouter from "./src/cartItems/cartitem.routes.js";
import cartRouter from "./src/features/cart/cartItems/cartitem.routes.js";
import orderRouter from "./src/features/order/order.routes.js";
import apiDocs from './swagger.json' with {type: 'json'};
import cors from 'cors';
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

import mongoose from "mongoose";
// console.log(apiDocs);
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
// import { upload } from "./src/middlewares/fileupload.middleware.js";


// 2)create server
const app=express();
app.use(express.json());

// CORS policy configuration using library 

var corsOptions = {
    origin: "http://localhost:5700",
    allowedHeaders:"*"
  }
  app.use(cors(corsOptions));

// without using library 
// app.use((req, res, next) => {
  
//        res.header ("Access-Control-Allow-Origin", "*");
//        res.header( "Access-Control-Allow-Methods", "*");
//         res.header("Access-Control-Allow-Headers", "*");
  

//     //  return ok for preflight request.
//     if(req.method=="OPTIONS"){
//       return res.sendStatus(200);
//     }
//     next();
//   })



app.use(loggerMiddleware);

// for all requests related to product ,redirect to product routes
app.use("/api-docs", swagger.serve,swagger.setup(apiDocs))
app.use("/api/products",jwtAuth,productRouter)
app.use("/api/users",userRouter)
app.use("/api/cartItems",jwtAuth,cartRouter);
app.use('/api/orders', jwtAuth, orderRouter);
app.use('/api/likes', likeRouter)


// Error handling middleware 
app.use((err,req,res,next)=>{
console.log(err);
if(err instanceof mongoose.Error.ValidationError){
    return res.status(400).send(err.message);
  }
if(err instanceof ApplicationError){
    res.status(err.code).send(err.message)
}
// for server errors
res.status(500).send("Something went wrong please try again later")
})
// Middleware to handle 404 errors
app.use((req,res)=>{
    res.status(404).send("API not found")
})













// 3)Default request handler
app.get("/",(req,res)=>{
    res.send("Welcome to E-Commerce APIs")
})
// 4)specify port
app.listen(4500,()=>{
console.log("E-Commerce App")
connectToMongoDB();
connectUsingMongoose();
})
// 1)the route is:client->server->router->controller->model->controller->client