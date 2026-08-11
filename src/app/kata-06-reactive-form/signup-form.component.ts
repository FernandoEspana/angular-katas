import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  // TODO: construye el formulario con sus validadores.
  ngOnInit(): void {}

  // TODO
  onSubmit(): void {}
}
