import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
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
