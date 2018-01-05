import { Product } from './products';
import { ShoppingCartItem } from  './shopping-cart-item';

export class ShoppingCart{

    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }){
        this.itemsMap = itemsMap || {};
        for ( const productId in itemsMap){
            const item = itemsMap[productId];
            const x = new ShoppingCartItem({
                ...item,
                $key: productId
            });
            //Object.assign(x, item);

            this.items.push(x);
        }
    }


    get productIds(){
        return Object.keys(this.itemsMap);
    }


    get totalItemsCount(){
      let count = 0;
      for ( const productId in this.itemsMap){
        count += this.itemsMap[productId].quantity;
      }

      return count;
    }

    get totalPrice(){
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.totalPrice;
        });
        return totalPrice;
    }

    getQuantity(product: Product){
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}
