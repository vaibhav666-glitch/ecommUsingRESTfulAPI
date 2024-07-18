import mongoose from "mongoose";
import { cartSchema } from "./cart.schema";

const cartModel= mongoose.model('Cart',cartSchema);

export default class cartRepository{
    
}