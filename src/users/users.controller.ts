import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('role') role?: User['role']) {
    return this.usersService.getUsers(role);
  }

  @Get(':id')
  getUser(@Param('id') id: User['id']) {
    return this.usersService.getUser(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(@Param('id') id: User['id'], @Body() user: Omit<User, 'id'>) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: User['id']) {
    return this.usersService.delete(id);
  }
}
