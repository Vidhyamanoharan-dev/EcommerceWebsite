import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cart: any[] = [];
  total = 0;
  showPopup = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCartForOrder();
  }

  loadCartForOrder() {
    this.api.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart for order', err)
    });
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, item) => {
      const price =
        item.price ??
        item.productPrice ??
        item.product?.price ??
        0;

      return sum + price * item.quantity;
    }, 0);
  }

  clearCartAfterOrder() {
    this.cart = [];
    this.total = 0;
  }

  placeOrder() {
    if (this.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      items: this.cart,
      totalAmount: this.total,
      orderDate: new Date()
    };

    this.api.placeOrder(orderData).subscribe({
      next: () => {
        this.showPopup = true;   // ✅ Show popup
        this.clearCartAfterOrder();
      },
      error: (err) => console.error("Error placing order", err)
    });
  }

  closePopup() {
    this.showPopup = false; // Close popup
  }

}
