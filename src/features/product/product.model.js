import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel{
    constructor( name, desc,price, imageUrl, category, sizes,id){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }
    static add(product){
        product.id=products.length+1;
        products.push(product);
        return product;
    }
    static get(id)
    {
        const product=products.find(
            (i)=>i.id==id
        );
        return product;
    }
    static GetAll()
    {
        return products;
    }
    static filter(minPrice, maxPrice, category)
    {
        const result=products.filter((product)=>{
           return( product.price>=minPrice || 
            product.price<=maxPrice ||
            product.category===category
           )
         })
         return result;
    }
     static rateProduct(userId, productId, rating)
     {
        //1. validate user and product
        const user=UserModel.getAll().find((u)=>u.id==userId)
        if(!user){
            throw new ApplicationError("User not found", 404);
        }
        const product=this.get(productId);
        if(!product)
        throw new ApplicationError("product not found", 404);
        
        //2. check if there are any ratings and if not then add ratings array.

        if(!product.ratings){
            product.ratings=[];
            product.ratings.push({userID: userId, rating: rating})
        }
        else
        // check if user rating is already available
    {
        const existingRatingIndex=product.ratings.findIndex((r)=>r.userID==userId);
        if(existingRatingIndex>=0)
        {
            product.ratings[existingRatingIndex]={
                userID:userId,
                rating:rating,
            }
        }
        else{
            product.ratings.push({userID: userId, rating: rating})
        }

    }
    }
}
var products = [
        new ProductModel(
        1,
        'Product 1',
'Description for Product 1',
19,
'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
"category1",
['M', 'XL', 'S']
),
new ProductModel(
2,
'Product 2',
'Description for Product 2',
29.99,
'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
"category2",
['M', 'XL']
),
new ProductModel(
3,
'Product 3',
'Description for Product 3',
39.99,
'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
"category3",
['M', 'L', 'XS']
)
]

