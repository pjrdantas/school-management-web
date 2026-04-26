import { Component, HostListener, OnInit, signal } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('microfrontend');

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
