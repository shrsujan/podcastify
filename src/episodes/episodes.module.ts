import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
