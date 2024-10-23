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
        <app-messages>
        </app-messages> 
      } @empty {
        messageS é uma lista vazia
      }
    </div>
  `,
  // OLD TEMPLATE: 
  /* 
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
        <app-messages [messageVarClasse]="msg"
                      (outputMessage)="msg.content = $event">
        </app-messages> 
      } @empty {
        messageS é uma lista vazia
      }
    </div>
  */
  // providers: [MessageService]
})

export class MessagesListComponent implements OnInit {
  messageS: Message[] = [];
  
  constructor (private messageService: MessageService){ }
  
  ngOnInit(): void {
    // messageS aponta para o array messageService que armazena os dados
    // this.messageS = this.messageService.getMessage(); // lista no frontend(próprio service)
    
    // metodo para fazer o get no backent
    this.messageService.getMessage()
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);
          console.log({content: dadosSucesso.objSMessageSRecuperadoS[0].content});
          console.log({id: dadosSucesso.objSMessageSRecuperadoS[0].messageId});
          
          this.messageS = dadosSucesso.objSMessageSRecuperadoS;
        },
        error: (dadosErro: any) => {
          console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
          console.log(dadosErro);
        }
      });
  }
}