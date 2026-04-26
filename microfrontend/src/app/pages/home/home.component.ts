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
    this.primeHistoryLock();
  }

  @HostListener('window:popstate')
  onPopState() {
    window.history.go(1);
    this.primeHistoryLock();
  }

  private primeHistoryLock() {
    window.history.pushState(null, '', window.location.href);
    window.history.pushState(null, '', window.location.href);
  }
}
