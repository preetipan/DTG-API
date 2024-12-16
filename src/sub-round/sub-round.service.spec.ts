import { Test, TestingModule } from '@nestjs/testing';
import { SubRoundService } from './sub-round.service';

describe('SubRoundService', () => {
  let service: SubRoundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubRoundService],
    }).compile();

    service = module.get<SubRoundService>(SubRoundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
