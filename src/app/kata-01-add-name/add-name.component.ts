import { Component } from '@angular/core';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
})
export class AddNameComponent {
  name = '';
  names: string[] = [];

  // TODO: implementa la lógica de agregado.
  addName(): void {}

  // TODO: devuelve true cuando el botón deba estar deshabilitado.
  get isDisabled(): boolean {
    return false;
  }
}
