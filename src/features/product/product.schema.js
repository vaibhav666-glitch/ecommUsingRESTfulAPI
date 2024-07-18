import mongoose  from "mongoose";

export const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category: Array,
    description: String,
    imageUrl:String,
    sizes:Array,
    reviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
        }
    ]

})