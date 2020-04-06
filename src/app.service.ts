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
    return 'User Microservice'
  }

  /**
   * Authenticates the user using specified Authorization token
   * @param user User data provided by the client
   */
  async authenticate(token: String): Promise<User> {
    const jwt =  token.split(" ")[1]
    console.log("Processing JWT : " + jwt) 

    return this.userService.verifyToken(jwt)
  }

  /**
   * Authenticates the user and generates a JWT token that can be passed
   * to the next microservice
   * @param user User data provided by the client
   */
  async authenticate1(user: User): Promise< any | {status: number} > {
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
