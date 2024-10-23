import { FormsModule, NgForm } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { MessageService } from "./messages.services";
import { Message } from "./messages.model";

@Component({
  selector: 'app-messages-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messages-input.component.html',
  styles: `input.ng-invalid.ng-touched {border: 1px solid red;}`
  // providers: [MessageService]
})

export class MessagesInputComponent {
  private messageService = inject(MessageService);
  
  onSubmit(form: NgForm){
    console.log("Messages-Input-Component: ");
    console.log(form);
    const messageAux = new Message(form.value.myContentngForm, 'Vini');
    
    this.messageService.addMessage(messageAux)
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);
          console.log({content: dadosSucesso.objMessageSave.content});
          console.log({_id: dadosSucesso.objMessageSave._id});
        },
        error: (dadosErro: any) => {
          console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
          console.log(dadosErro);
        }
      });
      
    form.resetForm();
  }
  
}