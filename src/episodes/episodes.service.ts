import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    return await this.databaseService.episode.findMany({
      orderBy: { createdAt: sort },
    });
  }

  async findFeatured() {
    return await this.databaseService.episode.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const episode = await this.databaseService.episode.findUnique({
      where: { id },
    });

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  async create(episdoeDto: Prisma.EpisodeCreateInput) {
    return await this.databaseService.episode.create({
      data: episdoeDto,
    });
  }

  async update(id: string, episodeDto: Prisma.EpisodeUpdateInput) {
    await this.findOne(id);

    return await this.databaseService.episode.update({
      where: { id },
      data: episodeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.databaseService.episode.delete({
      where: { id },
    });
  }
}
