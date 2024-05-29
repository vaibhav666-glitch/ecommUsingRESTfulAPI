import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRespository{

     async SignUp(newUser)
    {
        try{

        //1. Get the database
        const db=getDB();
        //2. get the collection
      const collection=db.collection("users");
      //3. Insert the component
   await   collection.insertOne(newUser);
   return newUser;
    }
    catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong with database", 500)
    }
        
    }


    async findByEmail(email)
    {
        try{

        //1. Get the database
        const db=getDB();
        //2. get the collection
      const collection=db.collection("users");
      //3. Insert the component
   return await  collection.findOne({email});
   
    }
    catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong with database", 500)
    }
        
    }


}
export default UserRespository;