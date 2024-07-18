
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class UserController{

    constructor(){
        this.userRepository=new UserRepository();
    }
    async signUp(req, res){
        try{
        const saltRounds=12;
        const salt= await bcrypt.genSalt(saltRounds);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;
        await this.userRepository.signUp(req.body);
        res.status(201).send(req.body);
        }
        catch(err){
            console.log(err);
            res.status(500).send("Error while signing up");
        }
    }



    async signIn(req, res){
        try{
            // 1. Find User by email.
        const user=await this.userRepository.findByEmail(req.body.email);
        if(!user)
                return res.status(400).send('Incorrect Credentials')
        else{
            // 2. Compare password with hashed password.
            const result = await bcrypt.compare(req.body.password , user.password)
        
                console.log(result)
                if(result)
            {
                // 1. create token.
                const token=jwt.sign({userID: user._id, email: user.email}, process.env.JWT_SECRET,
                 {expiresIn: '1h' });
                //2. send token.
                return res.status(200).send(token)
            }
            else
                throw new ApplicationError("Incorrect credentials",400)
    
        }
        }
    catch(err){
    console.log(err);
    throw new ApplicationError("Error while resetting password", 500)
    
    }
    }


    async resetPassword(req,res,next){
        try{
            const newPassword=req.body.password;
            const userId=req.userID;
            const saltRounds=12;
            const salt= await bcrypt.genSalt(saltRounds);
            const hashedPassword=await bcrypt.hash(newPassword,salt);
            await this.userRepository.resetPassword(userId,hashedPassword);
            res.status(200).send("Password reset successfully")
        
         }
    catch(err){
        console.log(err);
        throw new ApplicationError("Error while resetting password", 500)
            }

        
    }

}