import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu/menu').then(m => m.Menu),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'microfrontend',
        loadComponent: () =>
          loadRemoteModule('mfe1', './Component')
            .then(m => m.HomeComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
