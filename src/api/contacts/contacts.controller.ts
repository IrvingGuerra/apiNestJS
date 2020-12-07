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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/CreateContact.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contacts from the bnext system' })
  @ApiResponse({
    status: 200,
    description: 'The contacts has been successfully listed.',
  })
  public async getContacts(@Response() res) {
    const allContacts = await this.contactsService.findAll();
    return res.status(HttpStatus.OK).json(allContacts);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get contacts by user id' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'user id',
  })
  @ApiResponse({
    status: 200,
    description: 'The contacts by user id has been successfully listed.',
  })
  public async getContactsByUserId(@Response() res, @Param() param) {
    const contacts = await this.contactsService.findById(param.id);
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Get('common/:idA/:idB')
  @ApiOperation({
    summary: 'Get the common contacts between user A and user B',
  })
  @ApiParam({
    name: 'idA',
    type: String,
    required: true,
    description: 'user A',
  })
  @ApiParam({
    name: 'idB',
    type: String,
    required: true,
    description: 'user B',
  })
  @ApiResponse({
    status: 200,
    description:
      'The contacts between user A and user B has been successfully listed.',
  })
  public async findCommonContacts(@Response() res, @Param() param) {
    const commonContacts = await this.contactsService.findCommon(
      param.idA,
      param.idB,
    );
    return res.status(HttpStatus.OK).json(commonContacts);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createContact(
    @Response() res,
    @Body() createContactDTO: CreateContactDto,
  ) {
    const user = await this.contactsService.create(createContactDTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a contact' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'contact id',
  })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully updated.',
  })
  public async updateContact(
    @Param() param,
    @Response() res,
    @Body() createContactDTO: CreateContactDto,
  ) {
    const user = await this.contactsService.update(param.id, createContactDTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a contact' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'contact id',
  })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully deleted.',
  })
  public async deleteContact(@Param() param, @Response() res) {
    const user = await this.contactsService.delete(param.id);
    return res.status(HttpStatus.OK).json(user);
  }
}
