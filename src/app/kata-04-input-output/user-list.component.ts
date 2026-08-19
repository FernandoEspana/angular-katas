import { Component } from '@angular/core';
import { User } from './user.model';
import { UserCardComponent } from './user-card.component';

@Component({
  selector: 'app-user-list',
  template: `
    <!-- TODO
        un app-user-card por usuario, escuchando su salida
        nombre seleccionado -> data-testid="selected-name" (ausente si no hay selección)
    -->
    <div *ngFor="let user of users, index as i">
      <app-user-card (selected)="onSelected($event)" [user]="user"></app-user-card>
    </div>
    <p *ngIf="selected" data-testid="selected-name">{{selected.name}}</p>
  `,
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'Ada', role: 'Engineer' },
    { id: 2, name: 'Grace', role: 'Admiral' },
    { id: 3, name: 'Linus', role: 'Architect' }
  ];

  selected: User | null = null;

  // TODO
  onSelected(user: User): void {
    this.selected = user;
  }
}
