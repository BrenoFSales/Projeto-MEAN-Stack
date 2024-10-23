import { FormsModule } from '@angular/forms';
import { Component, input , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './messages.model';
import { MessageService } from './messages.services';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  // @Input() messageVarClasse : Message = new Message("","");
  messageVarClasse = input<Message>(new Message("",""));

  editMode: boolean = false; // Estado que define se a mensagem está em modo edição ou não
  mensagemEditada: string = ''; // Texto da mensagem que será editado

  ngOnInit() {
    this.mensagemEditada = this.messageVarClasse().content; // Copia a mensagem que será editada para o textarea
    console.log('mensagem inicializada!', this.messageVarClasse().messageId);
  }
  constructor(private messageServiceObj: MessageService) { }

  // Função para editar a mensagem
  editarMensagem(){
    // this.outputMessage.emit("Texto retornado componente mensagens!");
    if (this.editMode) {
      this.messageVarClasse().content = this.mensagemEditada;
      this.messageServiceObj.atualizarMensagem(this.messageVarClasse())
        .subscribe({
          next: () => this.editMode = false,
          error: (err) => console.error("Erro ao salvar a mensagem: ", err)
        });
    } else {
      this.editMode = true;
    }
  }

  // Função para cancelar a edição da mensagem
  cancelarEdicao(){
    this.editMode = false; // sai do modo edição da mensagem
    this.mensagemEditada = this.messageVarClasse().content; // reseta a variável mensagemEditada
  }

  excluirMensagem(){
    this.messageServiceObj.deleteMessage(this.messageVarClasse());
  }
}
