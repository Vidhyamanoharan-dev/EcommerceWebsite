import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'] // corrected from styleUrl
})
export class AdminDashboardComponent {

  constructor(private router: Router) {} // ← inject router

  edit(id: number) {
    this.router.navigate(['/admin/edit-product', id]);
  }
}
