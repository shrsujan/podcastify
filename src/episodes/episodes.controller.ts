import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodesService } from './episodes.service';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    return await this.episodesService.findAll(sort);
  }

  @Get('featured')
  async findFeatured() {
    return await this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  @Post()
  async create(@Body(ValidationPipe) episodeDto: CreateEpisodeDto) {
    return await this.episodesService.create(episodeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) episodeDto: UpdateEpisodeDto,
  ) {
    return await this.episodesService.update(id, episodeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.episodesService.remove(id);
  }
}
