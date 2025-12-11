import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: any[] = [];
  total = 0;

  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart', err)
    });
  }

  calculateTotal() {
    this.total = this.cart.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotal();
    this.api.updateCartQuantity(item.id, item.quantity).subscribe();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
      this.api.updateCartQuantity(item.id, item.quantity).subscribe();
    }
  }

  removeItem(id: number) {
    console.log("Removing ID:", id);

    this.api.removeFromCart(id).subscribe({
      next: () => {
        console.log("Backend deleted!");

        // Remove from array
        this.cart = this.cart.filter(item => item.id !== id);

        // Force Angular UI update
        this.cdr.detectChanges();

        // Or force refresh (only if above not working)
        // setTimeout(() => window.location.reload(), 100);
      },
      error: (err) => console.error("Error removing", err)
    });
  }




  goToOrder() {
    this.router.navigate(['/order']);
  }

}
