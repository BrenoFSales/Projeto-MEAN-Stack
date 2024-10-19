import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import { CommonModule } from '@angular/common'
import { Message } from '../messages/messages.model';
 
 // import { AllMessagesComponent } from '../messages/allMessages.component';
 
 import { HeaderComponent } from './header.component';
 
 import { MessageService } from '../messages/messages.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            HeaderComponent
           ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  
}
