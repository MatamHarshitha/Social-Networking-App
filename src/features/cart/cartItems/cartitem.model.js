//productId,userId,quantity

export default class CartItemModel{
    constructor(productId,userID,quantity,id){
        this.productId=productId;
        this.userID=userID;
        this.quantity=quantity;
        this.id=id;
        
    }
    static addItem(productId,userID,quantity){
        // When you call new CartItemModel(...), it internally calls the constructor method of the CartItemModel class:
        // The values of productId, userId, and quantity provided as arguments are assigned to the instance's properties (this.productId, this.userId, this.quantity).
        const cartItem=new CartItemModel(productId,userID,quantity);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem)
        return cartItem
        

    }
    static getItem(userID){
        return cartItems.filter((i)=>i.userID==userID)
        
    }
    static delete(cartItemID,userID){
        const cartItemIndex=cartItems.findIndex((i)=>i.id==cartItemID&&i.userID==userID);
        if(cartItemIndex==-1){
            return "Item not found"
        }
        else{
            cartItems.splice(cartItemIndex,1)
        }
    }
}
var cartItems=[new CartItemModel(1,2,1,1),new CartItemModel(2, 2, 3, 2)]