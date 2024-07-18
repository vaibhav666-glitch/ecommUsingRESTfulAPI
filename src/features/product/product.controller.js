
import ProductRepository from "./product.repository.js";
export default class ProductController{

    constructor(){
        this.productRepository=new ProductRepository();
    }
    async getAllProducts(req,res){
       try{ const product=await this.productRepository.getAll();
        res.status(200).send(product);
       }
       catch(err){
        return res.status(200).send("something went wrong");
    }
    }

    async addProduct(req, res){
        try{
        const createdRecord= await this.productRepository.add(req.body);
        //console.log(createdRecord)
        res.status(201).send(createdRecord)
        }
    catch(err){
        return res.status(200).send("no product found");
    }

    }

    async getOneProduct(req, res){
        try{
           
        const id=req.query._id;
        const product=await this.productRepository.get(id);
        return res.status(200).send(product);
        
    }
    catch(err){
        return res.status(200).send("Product not found");
    
    }
    }


    async filterProducts(req, res){
        try{
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result= await this.productRepository.filter(minPrice,maxPrice,category);
        console.log(result);
        res.status(200).send(result);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }

  async rateProduct(req, res){
        console.log(req.query);
        const userID=req.query.userID;
        const productID=req.query.productID;
        const rating=req.query.rating;
       try{
      await this.productRepository.rateProduct(userID,productID,rating);}
        
        catch(err){
            return res.status(400).send(err.message);
        }
      
        return res.status(200).send("Rating has been added");
    }
}
