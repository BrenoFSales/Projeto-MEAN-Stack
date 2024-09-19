import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesListComponent } from '../messages/messages-list.component';
import { MessagesInputComponent } from '../messages/messages-input.component';
import { CommonModule } from '@angular/common'
import { Message } from '../messages/messages.model';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            MessagesListComponent,
            MessagesInputComponent,
            CommonModule
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
