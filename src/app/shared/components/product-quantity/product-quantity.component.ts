import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/products';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;


  constructor(private cartService: ShoppingCartService) { }

  addToCart(product){
    this.cartService.addTocart(this.product);
  }


  removeFromCart(){
    this.cartService.removeFromcart(this.product);
  }


}
