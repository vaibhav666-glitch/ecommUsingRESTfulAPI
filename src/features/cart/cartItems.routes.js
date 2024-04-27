import express from 'express';
import  CartItemController  from './cartItems.controller.js';

const cartRouter=express.Router();
const cartItemController=new CartItemController();
cartRouter.delete('/:id',cartItemController.deleteItem);
cartRouter.post('/',cartItemController.add);
cartRouter.get('/',cartItemController.getItem);

export default cartRouter;
