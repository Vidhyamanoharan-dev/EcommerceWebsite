import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductListComponent
} from './admin/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/products/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./components/order/order.component').then(m => m.OrderComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },


  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' }, // default admin page
      { path: 'products', component: AdminProductListComponent },
      { path: 'add-product', component: ProductFormComponent },
      { path: 'edit-product/:id', component: ProductFormComponent }
    ]
  }
  ,


  { path: '**', redirectTo: '' },



];
