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
  `,
})
export class UserCardComponent {
  // TODO: declara el @Input y el @Output.
  @Input() user!: User;
}
