import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../messages/messages.component';
import { Message } from '../messages/messages.model';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet
            MessageComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  messageBinding: Message = new Message("Texto da Mensagem via Input","Breno Sales")
  // title = 'app-stack-mean';
  // message = {
  //  content: "To ficando fera com components!",
  //  author: "Brenin Show"
  //}
  
}
