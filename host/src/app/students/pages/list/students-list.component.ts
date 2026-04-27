import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent {
  private readonly router = inject(Router);

  protected goToNewStudent(): void {
    this.router.navigate(['/students/new']);
  }
}
