import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// Mock ApiService
class MockApiService {
  getCart() {
    return of([]);
  }
  removeFromCart(id: number) {
    return of({});
  }
}

// Mock Router
class MockRouter {
  navigate(path: any[]) {}
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],   // Standalone component import
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CartComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToOrder()', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.goToOrder();

    expect(router.navigate).toHaveBeenCalledWith(['/order']);
  });

});
