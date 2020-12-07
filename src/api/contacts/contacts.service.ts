import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IContact, IContactsService } from './interfaces';
import { CreateContactDto } from './dto/CreateContact.dto';
import { debug } from 'console';
import { IUser } from '../users/interfaces';

@Injectable()
export class ContactsService implements IContactsService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<IContact>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async findAll(): Promise<IContact[]> {
    return await this.contactModel.find().exec();
  }

  async findById(ID: string): Promise<IContact[]> {
    return await this.contactModel.find({ userId: ID }).exec();
  }

  async findCommon(idA: string, idB: string): Promise<IContact[]> {
    const contactsA = await this.contactModel.find({ userId: idA }).exec();
    const contactsB = await this.contactModel.find({ userId: idB }).exec();
    return contactsA.filter((contact1) =>
      contactsB.some(
        (contact2) => contact1.friendPhone === contact2.friendPhone,
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async create(createContactDto: CreateContactDto): Promise<IContact | string> {
    try {
      //Check if userId exist in system
      const id = mongoose.Types.ObjectId(createContactDto.userId);
      const user = await this.userModel.findById(id).exec();
      if (user) {
        // Check if the contact is bnext user
        const friend = await this.userModel
          .find({ phone: createContactDto.friendPhone })
          .exec();
        if (friend.length > 0) {
          createContactDto.bnextUser = true;
        } else {
          createContactDto.bnextUser = false;
        }
        const createdContact = new this.contactModel(createContactDto);
        return await createdContact.save();
      } else {
        return 'You are not in bnext system';
      }
    } catch (err) {
      debug('Server error create', err);
      return 'Server error';
    }
  }

  async update(ID: number, newValue: CreateContactDto): Promise<IContact> {
    const user = await this.contactModel.findById(ID).exec();
    if (!user._id) {
      debug('user not found');
    }
    await this.contactModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.contactModel.findById(ID).exec();
  }

  async delete(ID: number): Promise<string> {
    try {
      await this.contactModel.findByIdAndRemove(ID).exec();
      return 'The user has been deleted';
    } catch (err) {
      debug(err);
      return 'The user could not be deleted';
    }
  }
}
