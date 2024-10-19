import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive
  ],
  template: `
    <h1>Componente de Autenticação</h1>
    <header class="row">
      <nav class="col-12 col-offset-2">
        <ul class="nav nav-tabs d-flex justify-content-around">
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['signup']">SignUp</a></li>
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['signin']">SignIn</a></li>
          <li><a class="nav-link" routerLinkActive="active" [routerLink]="['logout']">LogOut</a></li>
        </ul>
      </nav>
    </header>
    
    <router-outlet></router-outlet>
  `
})

export class AuthenticationComponent{
  
}