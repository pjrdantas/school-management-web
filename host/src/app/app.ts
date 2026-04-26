import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
  private lockedUrl = window.location.href;
  private routerEventsSubscription?: Subscription;

  private readonly onPopState = () => {
    window.history.pushState({ navigationLocked: true }, '', this.lockedUrl);
    const target = this.lockedUrl.replace(window.location.origin, '');
    this.router.navigateByUrl(target, { replaceUrl: true });
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activateNavigationLock();
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.onPopState);
    this.routerEventsSubscription?.unsubscribe();
  }

  private activateNavigationLock() {
    this.lockedUrl = window.location.href;

    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.lockedUrl = window.location.href;
      });

    window.history.pushState({ navigationLocked: true }, '', this.lockedUrl);
    window.addEventListener('popstate', this.onPopState);
  }
}