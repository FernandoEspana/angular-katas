import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-card',
  template: `
    <!-- TODO
        nombre -> data-testid="user-name"
        rol    -> data-testid="user-role"
        botón  -> data-testid="select-btn"
    -->
    <span data-testid="user-name">{{user.name}} </span>
    <span data-testid="user-role">{{user.role}} </span>
    <button (click)="sendSelected()"data-testid="select-btn">Selected</button>
  `,
})
export class UserCardComponent {
  // TODO: declara el @Input y el @Output.
  @Input() user!: User;

  @Output() selected = new EventEmitter<User>();  

  sendSelected() {
    this.selected.emit(this.user);
  }
}
