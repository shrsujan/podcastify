import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { EpisodesService } from './episodes.service';
import { NotFoundException } from '@nestjs/common';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();

  const generateFakeEpisode = (overrides: any = {}) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    isFeatured: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  });

  const mockEpisodesService = {
    findAll: async () => [generateFakeEpisode(), generateFakeEpisode()],
    findFeatured: async () => [
      generateFakeEpisode({ isFeatured: true }),
      generateFakeEpisode({ isFeatured: true }),
    ],
    findOne: mockFindOne,
    create: async () => generateFakeEpisode(),
    update: async (id: string) => generateFakeEpisode({ id }),
    remove: async (id: string) => generateFakeEpisode({ id }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when episode is found', () => {
      const episodeId = 'some_existing_id';
      const mockResult = generateFakeEpisode({ id: episodeId });

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should call the service with correct params', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return correct response', async () => {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResult);
      });
    });

    describe('when episode is not found', () => {
      const episodeId = 'some_non_existing_id';
      const mockResult = null;

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should throw a 404 error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow(
          new NotFoundException('Episode not found'),
        );
      });
    });
  });
});
