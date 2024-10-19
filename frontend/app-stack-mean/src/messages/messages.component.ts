import { FormsModule } from '@angular/forms';
import { Component, input , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './messages.model';
import { MessageService } from './messages.services';

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
  
  @Output() outputMessage = new EventEmitter<string>();
  
  constructor(private messageServiceObj: MessageService) { }
  
  onEdit(){
    this.outputMessage.emit("Texto retornado componente mensagens!");
  }
  
  onDelete(){
    this.messageServiceObj.deleteMessage(this.messageVarClasse());
  }
}
