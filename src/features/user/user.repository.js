import mongoose from "mongoose";

import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const userModel= mongoose.model('User', userSchema)

export default class UserRepository{
    async signUp(user){
    try{
        const newUser=new userModel(user);
        await newUser.save();
        return newUser;
        }
    catch(err){
        console.log(err);
        throw new ApplicationError("Error while creating user", 500)
        }
    }

    async findByEmail(email)
    {
        try{
            const user=await userModel.findOne({email:email})
            return user;
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Error while signing in", 500)
        }
    }

    async resetPassword(userId,newPassword)
    {
        try{
            const user=await userModel.findById(userId);
            if(user)
            {
                user.password=newPassword;
                user.save();
            }
            else{
                throw new ApplicationError("User not found", 404);
            }
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Error while resetting password", 500)
        }

    }

}