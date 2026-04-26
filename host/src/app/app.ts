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
