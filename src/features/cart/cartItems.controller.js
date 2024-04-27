import CartItemModel from "./cartItems.model.js";

export default class CartItemController{
    add(req,res)
    {
        const {productID, quantity}=req.query;
        const userID=req.userID;
        CartItemModel.add(productID,userID,quantity);
        res.status(200).send('cart is updated');
    }
    getItem(req, res)
    {
        const userID=req.userID;
        const item=CartItemModel.getItem(userID);
        if(!item)
        res.status(401).send("cart is empty")
        
        res.status(200).send(item);
    }
    deleteItem(req, res){
        const cartItemID=req.params.id;
        console.log(cartItemID);
        const userID=req.userID;

        const error=CartItemModel.deleteItem(cartItemID,userID);
        if(error)
        return res.status(404).send(error);
        
        return res.status(200).send('Cart is successfully deleted')
    }
}