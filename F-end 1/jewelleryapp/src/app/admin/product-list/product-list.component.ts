import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add CommonModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class AdminProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getAdminProducts().subscribe(res => {
      this.products = res as any[];
    });
  }

  edit(id: number) {
    this.router.navigate(['/admin/edit-product', id]);
  }

  delete(id: number) {
    if (confirm('Delete product?')) {
      this.api.deleteAdminProduct(id).subscribe(() => this.loadProducts());
    }
  }

}
