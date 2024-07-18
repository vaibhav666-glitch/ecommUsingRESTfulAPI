// Manage routes/paths to ProductController

//1. Import express.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
//import {upload} from '../../middlewares/fileupload.middleware.js' 

// 2. Initialize express router.
const userRouter=express.Router();

// All the paths to controller methods.
// localhost/api/products
const userController=new UserController();
userRouter.post("/signup", (req, res)=>{
    userController.signUp(req,res)
})

userRouter.post("/signin", (req,res)=>{
    userController.signIn(req,res)
})
userRouter.put("/resetPassword",jwtAuth,(req,res)=>{
    userController.resetPassword(req,res)
})

export default userRouter