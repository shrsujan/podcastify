import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot({
      throttlers: [
        { name: 'short', ttl: 60000, limit: 10 },
        { name: 'long', ttl: 60000, limit: 100 },
      ],
    }),
    MyLoggerModule,
    EpisodesModule,
    TopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
