
import { HakerrankUser } from './hakerrank.interfaces';
import { User } from './users.service';
export class UserMapper {
    static mapHackerranckUserToUser( hackerranckUser :HakerrankUser): User {
        return {
            id: hackerranckUser.id,
            username: hackerranckUser.username,
            about: hackerranckUser.about
        }  
    }
    
    static mapHakerranckUsersToUserArray(users: HakerrankUser[]): User[] {
        return users.map(this.mapHackerranckUserToUser);
    }
}