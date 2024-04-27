import jwt from "jsonwebtoken"
const jwtAuth=(req, res, next)=>{
    //1. read the token
    const token=req.headers['authorization']
    //2. If no token, return the error.
    if(!token)
    return res.status(400).send('Unauthorized');
    //3. check if token is valid.
    try{
        const payload =jwt.verify(
            token, 
            "BMEB3yf4zTYQqMYJX8eIt6qk4FtlRU2i"
        )
        console.log(payload);
    }
   // return error
    catch(err)
    {
        return res.status(401).send(token);
    }

    //5. call next middleware

    next();
    
}
export default jwtAuth;