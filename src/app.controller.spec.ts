import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'de45e7b8-e106-412a-af61-471584511731'
        })
      ],
      controllers: [AppController],
      providers: [AppService, UserService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "User Microervice"', () => {
      expect(appController.getHello()).toBe('User Microervice');
    });
  });
});
