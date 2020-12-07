import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './schemes/contact.schema';
import { ContactsService } from './contacts.service';
import { UserSchema } from '../users/schemes/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
