import { forEach } from '@angular/router/src/utils/collection';
import { OrderService } from '../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent{
  orderId;
  order;
  totalSum = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');

    orderService.getOrderById(this.orderId).subscribe(order => {
      console.log(JSON.stringify(order));
      this.order = order;
      this.order.items.forEach(item => {
        this.totalSum += item.totalPrice;
      });
    });
  }

}
