import { Test, TestingModule } from '@nestjs/testing';
import { SubRoundController } from './sub-round.controller';
import { SubRoundService } from './sub-round.service';

describe('SubRoundController', () => {
  let controller: SubRoundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubRoundController],
      providers: [SubRoundService],
    }).compile();

    controller = module.get<SubRoundController>(SubRoundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
