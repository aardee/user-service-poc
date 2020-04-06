import { Controller, Get, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("UserService::Hello called")
    return this.appService.getHello();
  }

  // @Post('auth')
  // async authenticate(@Body() user: User): Promise<any> {
  //   return this.appService.authenticate(user);
  // }  

  @Post('auth')
  async authenticate(@Headers('authorization') token): Promise<any> {
    console.log(token)
    //Handle unauthenticated user condition...
    return this.appService.authenticate(token)
  }  
}
