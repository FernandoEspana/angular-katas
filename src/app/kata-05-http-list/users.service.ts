import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  username: string;
  about: string;
}

export const USERS_URL = 'https://jsonmock.hackerrank.com/api/article_users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  // TODO: GET a USERS_URL, desenvuelve el array `data` y mapéalo con UserMapper.
  getUsers(): Observable<User[]> {
    return of([]);
  }
}
