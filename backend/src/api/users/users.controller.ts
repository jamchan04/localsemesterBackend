import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';
import type { CreateUserDto } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMany(
    @Query('id') id?: string,
    @Query('userId') userId?: string,
    @Query('email') email?: string,
  ): Promise<User[]> {
    return this.usersService.findAll({ id, userId, email });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(Number(id));
  }
}
