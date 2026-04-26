import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/menu/menu').then(m => m.Menu),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./auth/pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./students/pages/list/students-list.component').then(
            m => m.StudentsListComponent,
          ),
      },
      {
        path: 'academic/periods',
        loadComponent: () =>
          import('./academic/pages/periods/academic-periods.component').then(
            m => m.AcademicPeriodsComponent,
          ),
      },
      {
        path: 'academic/classes',
        loadComponent: () =>
          import('./academic/pages/classes/academic-classes.component').then(
            m => m.AcademicClassesComponent,
          ),
      },
      {
        path: 'enrollment/new',
        loadComponent: () =>
          import('./enrollment/pages/new/enrollment-new.component').then(
            m => m.EnrollmentNewComponent,
          ),
      },
      {
        path: 'enrollment/search',
        loadComponent: () =>
          import('./enrollment/pages/search/enrollment-search.component').then(
            m => m.EnrollmentSearchComponent,
          ),
      },
      {
        path: 'microfrontend',
        loadComponent: () =>
          loadRemoteModule('mfe1', './Component').then(m => m.HomeComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
