import  UserModel  from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRespository from "./user.repository.js";
import bcrypt from 'bcrypt';
export default class UserController{

    constructor(){
        this.userRepository=new UserRespository();
    }
    async signUp(req, res){
        const{name,email,password,type}=req.body;
        const saltRounds=12;
        const salt= await bcrypt.genSalt(saltRounds);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=new UserModel(name,email,hashedPassword,type);
        await this.userRepository.SignUp(user);
        res.status(201).send(user);
    };
    async signIn(req, res,next){
        try{
            // 1. Find User by email.
        const user=await this.userRepository.findByEmail(req.body.email);
        if(!user)
            {
               
                return res.status(400).send('Incorrect Credentials')
            }
        else{
            // 2. Compare password with hashed password.
            const result= await bcrypt.compare(req.body.password , user.password);
        
        console.log(result)
        if(result)
       {
        // 1. create token.
        const token=jwt.sign({userID: result.id, email: result.email}, process.env.JWT_SECRET,
    {
        expiresIn: '1h',
    });
        //2. send token.
        return res.status(200).send(token)
    }
    else{

      // Log the hashed password

        return res.status(400).send('Incorrect Credentials')
    }
}
}
catch(err){
    console.log(err);
    return res.status(401).send("something went wrong")
}
    };
}