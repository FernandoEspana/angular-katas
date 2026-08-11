import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <!-- TODO
         un app-user-card por usuario, escuchando su salida
         nombre seleccionado -> data-testid="selected-name" (ausente si no hay selección)
    -->
  `,
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'Ada', role: 'Engineer' },
    { id: 2, name: 'Grace', role: 'Admiral' },
    { id: 3, name: 'Linus', role: 'Architect' },
  ];

  selected: User | null = null;

  // TODO
  onSelected(user: User): void {}
}
