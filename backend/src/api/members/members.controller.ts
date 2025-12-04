import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Member } from '../../entities/member.entity';
import { MembersService } from './members.service';
import type { CreateMemberDto } from './members.service';

@Controller('member')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findMany(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Post()
  create(@Body() body: CreateMemberDto): Promise<Member> {
    return this.membersService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Member>,
  ): Promise<Member> {
    return this.membersService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.membersService.remove(Number(id));
  }
}
