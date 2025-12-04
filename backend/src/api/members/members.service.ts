import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member.entity';

export interface CreateMemberDto {
  article: string;
  userId: number;
}

export type UpdateMemberDto = Partial<CreateMemberDto>;

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async create(dto: CreateMemberDto): Promise<Member> {
    if (!dto.article || !dto.userId) {
      throw new BadRequestException('article and userId are required');
    }
    const member = this.memberRepository.create(dto);
    return this.memberRepository.save(member);
  }

  async update(id: number, dto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    this.memberRepository.merge(member, dto);
    return this.memberRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    await this.memberRepository.delete(id);
  }
}
