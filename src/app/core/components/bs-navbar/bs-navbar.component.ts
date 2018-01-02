import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../shared/models/app.user';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{


  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;


  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(user => this.appUser = user);

    this.cart$ = await this.shoppingCartService.getCart();

  }
}
