// Manage routes/paths to ProductController

//1. Import express.
import express from 'express';
import UserController from './user.controller.js';
//import {upload} from '../../middlewares/fileupload.middleware.js' 

// 2. Initialize express router.
const userRouter=express.Router();

// All the paths to controller methods.
// localhost/api/products
const userController=new UserController();
userRouter.post("/signup", userController.signUp)

userRouter.post("/signin", userController.signIn);

export default userRouter