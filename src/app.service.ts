import { User } from './user/user.entity'
import { Injectable } from '@nestjs/common'
import { UserService } from './user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async authenticate(user: User): Promise< any | {status: number} > {
    //Validate User
    return this.userService.findByEmail(user.email)
      .then((userData) => {
        let payload = `{
          "email":"${userData.email}",
          "first_name":"${userData.first_name}",
          "last_name":"${userData.last_name}",
          "roles":${JSON.stringify(userData.roles)}
        }`
        const token = this.jwtService.sign(payload)
        return {
          expires_in: 3600,
          access_token: token,
          status: 200
        }
      })
      .catch((error) => {
        console.log("AUTH ERROR :: " + error)
        return {status : 403}
      })
  }
}
