import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly onPopState = () => {
    window.history.pushState({ navigationLocked: true }, '', window.location.href);
  };

  ngOnInit(): void {
    this.activateNavigationLock();
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.onPopState);
  }

  private activateNavigationLock() {
    window.history.pushState({ navigationLocked: true }, '', window.location.href);
    window.addEventListener('popstate', this.onPopState);
  }
}
