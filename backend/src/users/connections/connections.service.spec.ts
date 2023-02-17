import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from '../../models/connection.entity';
import { Repository } from 'typeorm';
import { ConnectionsService } from './connections.service';

describe('ConnectionsService', () => {
  let service: ConnectionsService;
  let mockConnectionsRepository =  {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionsService,
        {
          provide: getRepositoryToken(Connection),
          useValue: mockConnectionsRepository
        }
        
      ],
    }).compile();

    service = module.get<ConnectionsService>(ConnectionsService);
   
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
