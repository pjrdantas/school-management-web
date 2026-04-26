import { Component, HostListener, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.lockNavigationState();
  }

  @HostListener('window:popstate')
  onPopState() {
    this.lockNavigationState();
  }

  private lockNavigationState() {
    window.history.pushState(null, '', window.location.href);
  }
}
