import { FormsModule } from '@angular/forms';
import { Component, input } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  // @Input() messageVarClasse : Message = new Message("","");
  messageVarClasse = input<Message>(new Message("",""));
}
