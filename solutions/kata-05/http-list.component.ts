import { Component, OnInit } from '@angular/core';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-http-list',
  template: `
    <p *ngIf="loading" data-testid="loading">Loading...</p>
    <p *ngIf="error" data-testid="error">Something went wrong</p>

    <ul>
      <li *ngFor="let u of users; trackBy: trackById" data-testid="row">{{ u.username }}</li>
    </ul>
  `,
})
export class HttpListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  trackById(_index: number, user: User): number {
    return user.id;
  }
}
