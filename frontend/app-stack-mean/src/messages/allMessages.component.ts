import { Component } from '@angular/core';

import { MessagesListComponent } from './messages-list.component';
import { MessagesInputComponent } from './messages-input.component';

@Component({
  selector: 'app-allMessages',
  standalone: true,
  imports: [
      MessagesListComponent, MessagesInputComponent
    ],
  template: `
    <div class="row">
      <app-messages-input></app-messages-input>
    </div>
    <hr/>
    <div class="row">
      <app-messages-list></app-messages-list>
    </div>
  `
})

export class AllMessagesComponent {
  
}