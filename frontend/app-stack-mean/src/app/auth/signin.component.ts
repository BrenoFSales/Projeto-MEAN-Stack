import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
  myFormIn! : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.myFormIn = new FormGroup({
      emailTS: new FormControl(
        null,
        [
          // Validators.required,
          // Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
        ]),
      passwordTS: new FormControl(null, [/* Validators.required */])
    });
  }

  minusculoFValidator(control: AbstractControl) {
    const pass = control.value as string;

    if ( (pass !== pass?.toLowerCase()) && (pass !== null) ) {
      return { minusculoF: true };
    }
    else return null;
  }

  async onSubmit(){
    console.log(this.myFormIn.value);
    try {
      let response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: new URLSearchParams(this.myFormIn.value),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      let jsonresponse = await response.json();
      console.log(jsonresponse)
      // esse não é o ideal
      window.localStorage.setItem('jwt', jsonresponse.jwt);
    } catch (err) {
      console.error(err);
    }
    this.myFormIn.reset();
  }
}
