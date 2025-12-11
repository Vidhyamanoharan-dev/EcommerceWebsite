import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      imageUrl: [''],
      description: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this.isEdit = true;
      this.api.getAdminProductById(this.productId).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  submit() {
    if (this.isEdit) {
      this.api.updateAdminProduct(this.productId, this.form.value).subscribe(() => {
        alert('Product updated');
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.api.addAdminProduct(this.form.value).subscribe(() => {
        alert('Product added');
        this.router.navigate(['/admin/products']);
      });
    }
  }

}
