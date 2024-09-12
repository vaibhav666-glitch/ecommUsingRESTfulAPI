import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const productModel= mongoose.model('Product',productSchema)
const reviewModel=mongoose.model('Review',reviewSchema);
const categoryModel=mongoose.model('Category',categorySchema)

export default class ProductRepository{

    async add(newProduct){
        try{
            const product=  new productModel(newProduct);
           await product.save();
            console.log(product);
          for(let i=0;i<product.category.length;i++)
          {
            const category= await categoryModel.findOne({name:product.category[i]});
            console.log(category);
            if(category.length!=0 && category){
                category.products.push(product._id);
                await category.save();
            }
            
            else{
                let catObj={name:product.category[i],products:product._id};
            const catVal= new categoryModel(catObj);
            await catVal.save();
            
            }
          }

            return product;
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("something went wrong",500)
        }
    }

    async getAll(){
        try{
            const products= await productModel.find();
            if(products)
                return products
            else
            throw new ApplicationError("no products found",404)
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
        }
    }

    async get(id){
        try{
            const product= await productModel.findById(id);
            if(product)
                return product
            else
            throw new ApplicationError("no product found",404)
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
        }
    }

    async filter(minPrice,maxPrice,category){
        try{
            const products= await productModel.find({price:{$gte:minPrice,$lte:maxPrice},category:category})
            if(products)
                return products
            else
            throw new ApplicationError("no products found",404)
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
        }
    }

    async rateProduct(userId,productId,rating){
        try{
            
            const product= await productModel.findById(productId);
            if(!product)
                throw new ApplicationError("no product found",404);
            
         
            const userReview=await reviewModel.findOne({product: productId,user:userId});
           
            if(userReview){
                userReview.rating=rating;
                await userReview.save();
            }
            else{
                console.log(productId," ",userId, " ", rating)
                const review=  new reviewModel({product: productId,user:userId,rating:rating})
                await review.save();
            }
        }
        
        catch(err){
            console.log(err);
        }
    }
}