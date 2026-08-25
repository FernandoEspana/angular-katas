import { HackerRankUser } from './hackerrank.interfaces';
import { User } from './users.service';

export class UserMapper {
  static toUser(hackerRankUser: HackerRankUser): User {
    return {
      id: hackerRankUser.id,
      username: hackerRankUser.username,
      about: hackerRankUser.about,
    };
  }

  static toUserList(hackerRankUsers: HackerRankUser[]): User[] {
    return hackerRankUsers.map((user) => UserMapper.toUser(user));
  }
}
