import { Component, OnInit } from '@angular/core';
import { User, UsersService } from './users.service';
import { UserMapper } from './user.mapper';

@Component({
  selector: 'app-http-list',
  template: `
    <!-- TODO
        cargando -> data-testid="loading"
        fila     -> data-testid="row"
        error    -> data-testid="error" con el texto "Something went wrong"
    -->
    <span *ngIf="loading" data-testid="loading">...cargando</span>
    <span *ngIf="error" data-testid="error">Something went wrong</span>
    <ul>
      <li data-testid="row" *ngFor="let user of users">{{ user.username }}</li>
    </ul>
  `,
})
export class HttpListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = false;

  constructor(private usersService: UsersService) {}

  // TODO
  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe(
      (response) => {
        this.loading = false;
        this.users = UserMapper.mapHakerranckUsersToUserArray(response.data);
        console.log('users mapeados->', this.users);
      }, 
      (error) => {
        console.log(error);
        this.loading = false;
        this.error = true;
      }
    );
  }
}
