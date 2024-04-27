//1. Import Express
import express from "express";
import  ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middlewear.js";
import  bodyParser from 'body-parser'
import jwtAuth from "./src/middlewares/jwt.middleware.js";
//2. create server

const server=express();
server.use(bodyParser.json())
// for all request related to product, redirect to product routes.
server.use('/api/products',jwtAuth, ProductRouter)
server.use('/api/users',userRouter)



//3. Default request handler

server.get("/", (req,res)=>{
    res.send("Welcome to Ecommerce APIs");
})

//4. Specify port.


server.listen(3200, () => {
    console.log("server is listening on 3200");
  });