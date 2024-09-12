// Manage routes/paths to ProductController

//1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js' 

// 2. Initialize express router.
const ProductRouter=express.Router();

// All the paths to controller methods.
// localhost/api/products
const productController=new ProductController();
ProductRouter.post('/rate',(req,res)=>{productController.rateProduct(req,res)});
ProductRouter.get("/filter", (req,res)=>{productController.filterProducts(req,res)});
ProductRouter.get("/id",(req,res)=>{productController.getOneProduct(req,res)});
ProductRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});
ProductRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});



export default ProductRouter