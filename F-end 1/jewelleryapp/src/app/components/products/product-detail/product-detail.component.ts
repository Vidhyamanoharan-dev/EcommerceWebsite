import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.api.getProductById(productId).subscribe({
        next: (res: any) => this.product = res,
        error: (err: any) => console.error('Error fetching product details', err)
      });
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const cartItem = {
      productId: this.product.id,
      quantity: 1
    };

    this.api.addToCart(cartItem).subscribe({
      next: (res) => {
        alert(`${this.product.name} added to cart!`);

        // 👉 Navigate to cart page
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Error adding to cart', err);
        alert('Failed to add to cart.');
        window.location.href="/login"
      }
    });
  }

}
