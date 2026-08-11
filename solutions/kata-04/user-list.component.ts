import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <app-user-card
      *ngFor="let u of users; trackBy: trackById"
      [user]="u"
      (selected)="onSelected($event)"
    ></app-user-card>

    <p *ngIf="selected" data-testid="selected-name">{{ selected.name }}</p>
  `,
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'Ada', role: 'Engineer' },
    { id: 2, name: 'Grace', role: 'Admiral' },
    { id: 3, name: 'Linus', role: 'Architect' },
  ];

  selected: User | null = null;

  onSelected(user: User): void {
    this.selected = user;
  }

  trackById(_index: number, user: User): number {
    return user.id;
  }
}
