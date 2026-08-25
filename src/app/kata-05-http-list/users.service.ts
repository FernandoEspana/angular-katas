import { HakerranckResponse } from './hakerrank.interfaces';
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

  // TODO: GET a USERS_URL y devuelve solo el array `data`.
  // getUsers(): Observable<User[]> {
  //   return of([]);
  // }

  getUsers() {
    return this.http.get<HakerranckResponse>(USERS_URL);
  }


}
