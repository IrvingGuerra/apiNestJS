import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users from the bnext system' })
  @ApiResponse({
    status: 200,
    description: 'The users has been successfully listed.',
  })
  public async getUsers(@Response() res) {
    const todos = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id from the bnext system' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'user id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully listed.',
  })
  public async getUser(@Response() res, @Param() param) {
    const user = await this.usersService.findById(param.id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createUser(
    @Response() res,
    @Body() createUserDTO: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'user id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  public async updateUser(
    @Param() param,
    @Response() res,
    @Body() updateUserDTO: CreateUserDto,
  ) {
    const user = await this.usersService.update(param.id, updateUserDTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'user id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  public async deleteUser(@Param() param, @Response() res) {
    const user = await this.usersService.delete(param.id);
    return res.status(HttpStatus.OK).json(user);
  }
}
