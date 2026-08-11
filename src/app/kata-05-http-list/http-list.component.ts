import { Component, OnInit } from '@angular/core';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-http-list',
  template: `
    <!-- TODO
         cargando -> data-testid="loading"
         fila     -> data-testid="row"
         error    -> data-testid="error" con el texto "Something went wrong"
    -->
  `,
})
export class HttpListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = false;

  constructor(private usersService: UsersService) {}

  // TODO
  ngOnInit(): void {}
}
