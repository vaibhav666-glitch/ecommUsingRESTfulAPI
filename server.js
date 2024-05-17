//1. Import Express
import express from "express";
import apiDocs from "./swagger.json" assert {type:'json'};
import swagger from 'swagger-ui-express';
import  ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middlewear.js";
import cors from 'cors'
import  bodyParser from 'body-parser'
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import loggerMiddleWAre from "./src/middlewares/logger.middlewear.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
//2. create server

const server=express();

// cors policy configuration

// server.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", '*')
//     res.header("Access-Control-Allow-Headers", '*')
//     res.header("Access-Control-Allow-Methods", '*')
    
//     //return ok for preflight request
//     if(req.method=="OPTIONS")
//          return res.status(200)
//     next();
// })


// for specific headers and specific origin
var corsOptions={
    origin:"http://localhost:5500"
}

server.use(cors());


server.use(bodyParser.json())
// for all request related to product, redirect to product routes.
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleWAre)
server.use('/api/products',jwtAuth, ProductRouter)
server.use('/api/users',userRouter)
server.use('/api/cartItems',jwtAuth,cartRouter)

// 4. Middleware to handle 404 requests.
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
    })
    


//3. Default request handler

server.get("/", (req,res)=>{
    res.send("Welcome to Ecommerce APIs");
})

// Error handler middleware
server.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }

    // server errors.
    res.status(500).send("Something went wrong, please try again later")
})

//4. Specify port.


server.listen(3200, () => {
    console.log("server is listening on 3200");
  });