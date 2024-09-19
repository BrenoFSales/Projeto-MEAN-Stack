import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messages-input.component.html',
})

export class MessagesInputComponent {
  onSave(textoConsole: string){
    alert(textoConsole);
  }
}