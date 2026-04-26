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
