import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Session } from '../../entities/session.entity';
import { SessionsService } from './sessions.service';
import type { CreateSessionDto } from './sessions.service';

@Controller('session')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  findMany(
    @Query('sessionId') sessionId?: string,
    @Query('uid') uid?: string,
  ): Promise<Session[]> {
    return this.sessionsService.findAll({ sessionId, uid });
  }

  @Post()
  create(@Body() body: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.sessionsService.remove(Number(id));
  }
}
