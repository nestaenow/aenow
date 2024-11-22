import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import { routes } from './app/app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="nav-menu" *ngIf="showNavigation()">
      <a routerLink="/admin">Admin</a>
      <a routerLink="/view">View Invitation</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {
  name = 'Aenow';

  showNavigation(): boolean {
    return window.location.pathname !== '/invite/' + window.location.pathname.split('/').pop();
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});