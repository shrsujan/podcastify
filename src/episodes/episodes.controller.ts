import {
  Body,
  Controller,
  Delete,
  Get,
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
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) episodeDto: CreateEpisodeDto) {
    return this.episodesService.create(episodeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) episodeDto: UpdateEpisodeDto,
  ) {
    return this.episodesService.update(id, episodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(id);
  }
}
