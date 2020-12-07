import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './api/users/users.module';
import { ContactsModule } from './api/contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root123@mongo:27017/bnext?authSource=admin',
    ),
    UsersModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
