import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html'
})

export class SignupComponent {
  myForm! : FormGroup;

  async onSubmit(){
    try {
      await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: new URLSearchParams(this.myForm.value),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
    } catch (err) {
      console.error(err);
    }
    this.myForm.reset();
  }

  ngOnInit(){
    this.myForm = new FormGroup({
      firstNameTS: new FormControl(null, Validators.required),
      lastNameTS: new FormControl(null, [
        Validators.required,
        Validators.minLength(4), Validators.maxLength(16)
      ]),
      emailTS: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      passwordTS: new FormControl(null, Validators.required)
    });
  }
}
