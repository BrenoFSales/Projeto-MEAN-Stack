import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div class="col-md-8 col-md-offset-">
      <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
  `
})

export class LogoutComponent {
  onLogout(){
    
  }
}