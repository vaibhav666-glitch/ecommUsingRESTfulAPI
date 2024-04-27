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
ProductRouter.post('/rate',productController.rateProduct);
ProductRouter.get("/filter", productController.filterProducts)
ProductRouter.get('/',productController.getAllProducts );
ProductRouter.post('/',upload.single('imageUrl'),productController.addProduct);
ProductRouter.get("/:id", productController.getOneProduct);

export default ProductRouter