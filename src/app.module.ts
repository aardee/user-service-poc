import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'de45e7b8-e106-412a-af61-471584511731'
    })
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
