//1. Import Express
import express from "express";
import  ProductRouter from "./src/features/product/product.routes.js";
//2. create server

const server=express();

// for all request related to product, redirect to product routes.
server.use('/api/products', ProductRouter)



//3. Default request handler

server.get("/", (req,res)=>{
    res.send("Welcome to Ecommerce APIs");
})

//4. Specify port.


server.listen(3200, () => {
    console.log("server is listening on 3200");
  });