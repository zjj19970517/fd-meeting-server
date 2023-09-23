import { Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/share.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
