import { FormsModule } from '@angular/forms';
import { Component, input , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './messages.model';

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
  onEdit(){
    // alert('Tah funcionando...');
    this.outputMessage.emit("Texto retornado: venho de message (child) para o app (pai)");  
  }
}
