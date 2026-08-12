import { Component } from '@angular/core';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
})
export class AddNameComponent {
  name = '';
  names: string[] = [];

  // TODO: implementa la lógica de agregado.
  addName(input: HTMLInputElement): void {
    const value = input.value.trim();
    const exists = this.names.find( n => this.name.trim().toLowerCase() === n.toLowerCase() );
    if(!value || exists) {
      return
    }
    this.names.push(value);
    this.name ='';
    
  }

  // TODO: devuelve true cuando el botón deba estar deshabilitado.
  get isDisabled(): boolean {
    if (this.name.trim().length === 0 ) return true;
    return false;
  }
}
