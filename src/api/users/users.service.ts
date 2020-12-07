import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUsersService } from './interfaces';
import { CreateUserDto } from './dto/CreateUser.dto';
import { debug } from 'console';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private http: HttpService,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findById(ID: number): Promise<IUser> {
    return await this.userModel.findById(ID).exec();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async create(createUserDto: CreateUserDto): Promise<IUser | string> {
    try {
      // Fist Check if the phone is valid
      const params = {
        'user-id': 'IrvingTsukune',
        'api-key': 'fgWVP80OGaPrRVFppCjYHzNOyV4E9nz6vioBrdDcj323UDQN',
        number: createUserDto.phone,
        'country-code': 'MX',
      };
      const res = await this.http
        .post('https://neutrinoapi.net/phone-validate', params)
        .toPromise();
      if (res.data.valid) {
        // Then check if exist in the system
        /* TO DO
        this.userModel.count({ phone: createUserDto.phone }, function (count) {
          console.log(count);
        });
         */
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
      } else {
        return 'The phone is not valid';
      }
    } catch (err) {
      debug('Server error create', err);
      return 'Server error';
    }
  }

  async update(ID: number, newValue: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.findById(ID).exec();
    if (!user._id) {
      debug('user not found');
    }
    await this.userModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.userModel.findById(ID).exec();
  }

  async delete(ID: number): Promise<string> {
    try {
      await this.userModel.findByIdAndRemove(ID).exec();
      return 'The user has been deleted';
    } catch (err) {
      debug(err);
      return 'The user could not be deleted';
    }
  }
}
