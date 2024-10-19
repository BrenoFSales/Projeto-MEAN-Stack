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
  
  // onSave(textoConsole: string){
  //  const messageAux = new Message(textoConsole, "Breno");
  //  this.messageService.addMessage(messageAux);
  //  console.log(textoConsole);
  
  onSubmit(form: NgForm){
    console.log("Messages-Input-Component");
    console.log(form);
    const messageAux = new Message(form.value.myContentngForm, 'Breno');
    this.messageService.addMessage(messageAux);
    form.resetForm();
  }
  
}