import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {

    async findByEmail(email: string): Promise<User> {
        console.log(email)
        let user = null;
        if (email === 'admin@poc.com') {
            user = new User()
            user.id = 1
            user.email = 'admin@poc.com'
            user.first_name = 'Jane'
            user.last_name = 'Doe'
            user.roles = ['ADMIN', 'USER', 'EDITOR']
        }
        return (user != null) ? Promise.resolve (user) : Promise.reject("Invalid user")
    }
}
