// Manage routes/paths to ProductController

//1. Import express.
import express from 'express';
import ProductController from './product.controller.js';

// 2. Initialize express router.
const ProductRouter=express.Router();

// All the paths to controller methods.
// localhost/api/products
const productController=new ProductController();
ProductRouter.get('/',productController.getAllProducts );
ProductRouter.post('/', productController.addProduct);
ProductRouter.get("/", productController.getOneProduct);

export default ProductRouter