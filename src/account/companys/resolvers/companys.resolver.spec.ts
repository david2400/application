import { Test, TestingModule } from '@nestjs/testing';
import { CompanysResolver } from './companys.resolver';
import { CompanysService } from '../services/companys.service';

describe('CompanysResolver', () => {
  let resolver: CompanysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanysResolver, CompanysService],
    }).compile();

    resolver = module.get<CompanysResolver>(CompanysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
