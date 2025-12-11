import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap, switchMap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'   // ✅ makes it globally available
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // change this to your backend

  constructor(private http: HttpClient) {}


  // 🔹 Authentication
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, userData, {
      responseType: 'text' as 'json'
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        localStorage.setItem('token', response.token); // Save token
        localStorage.setItem('refreshToken', response.refreshToken); // Save refresh token if applicable
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/auth/send-otp`, { email });
  }


  verifyOtpAndReset(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, data);
  }


  // 🔹 Products
  getProducts(page: number, size: number) {
    return this.http.get<any>(`http://localhost:8080/api/products?page=${page}&size=${size}`);
  }


  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }


  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // 🔹 Cart
  getCart(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/cart`, { headers });
  }


  addToCart(item: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might not be logged in.');
      return throwError(() => new Error('User not authenticated'));
    }

    const headers = { Authorization:`Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/cart`, item, { headers }).pipe(
      catchError((error) => {
        if (error.status === 403) {
          console.error('Access forbidden. Token might be expired. Attempting to refresh token.');
          return this.refreshToken().pipe(
            switchMap((newToken) => {
              localStorage.setItem('token', newToken);
              const newHeaders = { Authorization: `Bearer ${newToken}` };
              return this.http.post(`${this.baseUrl}/cart`, item, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('Sending refresh token:', refreshToken);
    return this.http.post<string>(`${this.baseUrl}/auth/refresh-token`, { refreshToken });
  }


  updateCart(id: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.baseUrl}/cart/${id}`, { quantity }, { headers });
  }


  updateCartQuantity(id: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.baseUrl}/cart/${id}`, { quantity }, { headers });
  }



removeFromCart(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.delete(`${this.baseUrl}/cart/${id}`, { headers });
}

  // 🔹 Orders
  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

  getOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/orders`, { headers });
  }
// ADMIN CRUD
getAdminProducts() {
  return this.http.get(`${this.baseUrl}/admin/products`);
}

getAdminProductById(id: number) {
  return this.http.get(`${this.baseUrl}/admin/products/${id}`);
}

addAdminProduct(data: any) {
  return this.http.post(`${this.baseUrl}/admin/products/add`, data);
}

updateAdminProduct(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/admin/products/update/${id}`, data);
}

deleteAdminProduct(id: number) {
  return this.http.delete(`${this.baseUrl}/admin/products/delete/${id}`);
}



}
// function switchMap(arg0: (newToken: any) => Observable<Object>): import("rxjs").OperatorFunction<string, unknown> {
//   throw new Error('Function not implemented.');
// }

