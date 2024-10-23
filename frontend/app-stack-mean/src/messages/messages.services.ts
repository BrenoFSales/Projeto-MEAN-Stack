import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map} from 'rxjs';

import { Message } from "./messages.model";

// MessageService toma conta de sincronizar o estado das mensagens com o back
@Injectable()
export class MessageService {
  private baseUrl = "http://localhost:3000";

  private messageService: Message[] = [];

  errorHandler(e: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: e, // Pega o server-side error
      error_CS: "Client-Side: errorHandler : Ocorreu um erro!" // Pega o client-side error
    })
  }

  private http = inject(HttpClient);

  // Funcao para adicionar mensagem na lista
  addMessage(message: Message) {
    this.messageService.push(message);
    console.log(this.messageService);

    return this.http.post<any>(`${this.baseUrl}/message`, message).pipe(
      catchError((e) => this.errorHandler(e, "addMessage()"))
    );
    // try {
    //   let messageString = JSON.stringify({message: message});
    //   await fetch('http://localhost:3000/save-message', {
    //     method: 'POST',
    //     body: messageString,
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //     }
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  }
  
  // Função par atualizar a mensagem no backend
  atualizarMensagem(message: Message): Observable<any> {
    return this.http.put(`${this.baseUrl}/message`, message)
  }

  // Funcao para remover mensagem da lista
  deleteMessage(message: Message) {
    this.messageService.splice(this.messageService.indexOf(message), 1); // Remove da lista
    // Precisa remover a mensagem no backend
  }

  // Funcao para buscar uma mensagem
  getMessage() {
    // return this.messageService;

    return this.http.get<any>(`${this.baseUrl}/message`).pipe(
      map((responseRecebida : any) => {
        console.log(responseRecebida);
        console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content});
        console.log({_id: responseRecebida.objSMessageSRecuperadoS[0]._id});
  
        const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;
  
        let transfomedCastMessagesModelFrontend: Message[] = [];
        for(let msg of messageSResponseRecebida){
          transfomedCastMessagesModelFrontend.push(
            new Message(msg.content, 'Vinicius', msg._id)
          );
        }
        this.messageService = [...transfomedCastMessagesModelFrontend];
        responseRecebida.objSMessageSRecuperadoS = this.messageService;
  
        console.log({myMsgSucesso: responseRecebida.myMsgSucesso});
        console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content});
        console.log({id: responseRecebida.objSMessageSRecuperadoS[0].messageId});
  
        return responseRecebida;
      }),
      catchError((e) => this.errorHandler(e, "getMessage()"))
    );
  }

}
