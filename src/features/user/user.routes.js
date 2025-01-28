// import userController from "./user.controller.js";
// // import { upload } from "../../middlewares/fileupload.middleware.js";
// // 1)Import express
// import express from "express"
// const Usercontroller= new userController
// // 2)Initialize express router

// const userRoutes=express.Router();
// userRoutes.post("/signup",Usercontroller.signUp);
// userRoutes.post("/signin",Usercontroller.signIn)
// export default userRoutes

// Manage routes/paths to ProductController

// 1. Import express.
// import express from 'express';
// import UserController from './user.controller.js';

// // 2. Initialize Express router.
// const userRouter = express.Router();

// const userController = new UserController();

// // All the paths to controller methods.

// userRouter.post('/signup', userController.signUp);
// userRouter.post('/signin', userController.signIn);

// export default userRouter;

import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

// userRouter.post('/signup', userController.signUp);
// userRouter.post('/signin', userController.signIn);

userRouter.post('/signup', (req, res,next)=>{
    userController.signUp(req, res,next)
});
userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});
userRouter.put('/resetpassword',jwtAuth, (req, res)=>{
    userController.resetPassword(req, res)
});


export default userRouter;