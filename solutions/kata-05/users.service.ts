import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HackerRankResponse } from './hackerrank.interfaces';
import { UserMapper } from './user.mapper';

export interface User {
  id: number;
  username: string;
  about: string;
}

export const USERS_URL = 'https://jsonmock.hackerrank.com/api/article_users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<HackerRankResponse>(USERS_URL)
      .pipe(map((response) => UserMapper.toUserList(response.data)));
  }
}
