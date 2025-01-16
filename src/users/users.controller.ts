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

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    return [{ role }];
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: any) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: any) {
    return { id, ...user };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
