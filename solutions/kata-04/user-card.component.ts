import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-card',
  template: `
    <div>
      <span data-testid="user-name">{{ user.name }}</span>
      <span data-testid="user-role">{{ user.role }}</span>
      <button type="button" data-testid="select-btn" (click)="selected.emit(user)">
        Select
      </button>
    </div>
  `,
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() selected = new EventEmitter<User>();
}
