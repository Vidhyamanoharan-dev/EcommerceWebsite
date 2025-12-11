import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports :[CommonModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
page = 0;
size = 10;
totalPages = 0;

constructor(private apiService: ApiService) {}

ngOnInit() {
  this.loadProducts();
}

loadProducts() {
  this.apiService.getProducts(this.page, this.size).subscribe(res => {
    this.products = res.content;   // paginated list
    this.totalPages = res.totalPages;
  });
}

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadProducts();
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadProducts();
  }
}
}
