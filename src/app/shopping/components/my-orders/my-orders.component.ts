import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {
  orders$;
  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {
    this.orders$ = this.authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }

  viewOrder(key) {
    this.router.navigate(['/order/', key]);
  }
}
