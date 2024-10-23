import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  async addMessage(message: Message) {

    // return this.http.post<any>(`${this.baseUrl}/message`, message).pipe(
    //   catchError((e) => this.errorHandler(e, "addMessage()"))
    // );

    let jwt = window.localStorage.getItem("jwt");
    try {
      let response = await fetch('http://localhost:3000/message', {
        method: 'POST',
        body: JSON.stringify({jwt: jwt, message: message}),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      if (!response.ok) {
        throw response;
      }
      let json = await response.json();
      message.username = json.user.username;

    } catch (err) {
      console.log(err)
    }

    this.messageService.push(message);
    console.log(this.messageService);
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

    // fetch(`${this.baseUrl}/message`, { headers: {
    //   // 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    // }}).then(x => console.log(x));
    //
    // const headers = new HttpHeaders({
    //   // 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    // });

    return this.http.post<any>(`${this.baseUrl}/message/get`, { jwt: window.localStorage.getItem('jwt') }).pipe(
      map((responseRecebida : any) => {
        console.log(responseRecebida);
        console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content});
        console.log({_id: responseRecebida.objSMessageSRecuperadoS[0]._id});

        const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;

        let transfomedCastMessagesModelFrontend: Message[] = [];
        for(let msg of messageSResponseRecebida){
          transfomedCastMessagesModelFrontend.push(
            new Message(msg.content, msg.user.username, msg._id)
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
