import ProductModel from "./product.model.js";
export default class ProductController{

    getAllProducts(req,res){
        const product=ProductModel.GetAll();
        res.status(200).send(product);
    }

    addProduct(req, res){
        console.log(req.body);
        res.status(200).send("post request received");

    }

    rateProduct(req, res){}

    getOneProduct(req, res){}
}
