import { Injectable } from "@angular/core";

import { Message } from "./messages.model";

@Injectable()
export class MessageService {
  private messageService: Message[] = [];
  
  // Funcao para adicionar mensagem na lista
  addMessage(message: Message) {
    this.messageService.push(message);
    console.log(this.messageService);
  }
  
  // Funcao para remover mensagem da lista
  deleteMessage(message: Message) {
    this.messageService.splice(this.messageService.indexOf(message), 1);
  }
  
  // Funcao para buscar uma mensagem
  getMessage() {
    return this.messageService;
  }
  
}