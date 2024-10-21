import { FormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { MessagesComponent } from '../messages/messages.component';

import { MessageService } from "./messages.services";
import { Message } from './messages.model';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [
              FormsModule,
              MessagesComponent
           ],
  template: `
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
        <app-messages [messageVarClasse]="msg"
                      (outputMessage)="msg.content = $event">
        </app-messages> 
      } @empty {
        messageS é uma lista vazia
      }
    </div>
  `,
  // providers: [MessageService]
})

export class MessagesListComponent implements OnInit {
  messageS: Message[] = [];
  
  constructor (private messageService: MessageService){ }
  
  ngOnInit(): void {
    // messageS aponta para o array messageService que armazena os dados
    // this.messageS = this.messageService.getMessage();
    
    this.messageService.getMessage()
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);
          console.log({content: dadosSucesso.objSMessageSRecuperadoS[0].content});
          console.log({id: dadosSucesso.objSMessageSRecuperadoS[0].messageId});
          
          this.messageS = dadosSucesso.objSMessageSRecuperadoS;
        },
        error: (dadosErro) => {
          console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
          console.log(dadosErro);
        }
      });
  }
}