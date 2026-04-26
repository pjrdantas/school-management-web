import { Component, signal, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
  private timer!: any;
  opened = signal(false);

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  toggleMenu() {
    this.opened.update(v => !v);
  }

  goHome() {
    this.router.navigate(['']);
    this.opened.set(false);
  }

  openMicrofrontend() {
    this.router.navigate(['/microfrontend']);
    this.opened.set(false);
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

  private atualizarDataHora() {
    const agora = new Date();
    this.dataHoraFormatada =
      agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) +
      ' - ' +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
}

