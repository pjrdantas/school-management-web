import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-menu',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit, OnDestroy {
  dataHoraFormatada = '';
  private timer!: ReturnType<typeof setInterval>;
  opened = signal(false);

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  toggleMenu() {
    this.opened.update(v => !v);
  }

  goHome() {
    this.navigateTo('/home');
  }

  goLogin() {
    this.navigateTo('/auth/login');
  }

  goStudents() {
    this.navigateTo('/students');
  }

  goAcademicPeriods() {
    this.navigateTo('/academic/periods');
  }

  goAcademicClasses() {
    this.navigateTo('/academic/classes');
  }

  goEnrollmentNew() {
    this.navigateTo('/enrollment/new');
  }

  goEnrollmentSearch() {
    this.navigateTo('/enrollment/search');
  }

  openMicrofrontend() {
    this.navigateTo('/microfrontend');
  }

  ngOnInit(): void {
    this.atualizarDataHora();
    this.timer = setInterval(() => {
      this.atualizarDataHora();
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private navigateTo(path: string) {
    this.router.navigate([path]);
    this.opened.set(false);
  }

  private atualizarDataHora() {
    const agora = new Date();
    this.dataHoraFormatada =
      agora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) +
      ' - ' +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
}
