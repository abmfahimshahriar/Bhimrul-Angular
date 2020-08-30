import { Component } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  order$;

  constructor(private orderService: OrderService) {
    this.order$ = this.orderService.getOrders();
  }

}