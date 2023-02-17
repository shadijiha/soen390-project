import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from '../../models/connection.entity';
import { Repository } from 'typeorm';
import { ConnectionsService } from './connections.service';

describe('ConnectionsService', () => {
  let service: ConnectionsService;
  let mockConnectionsRepository =  {
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{since: undefined, user_1: {id: 1}}]),
    }))
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

  // it('should add connection', async () => {
  //   const result = await service.addConnection(1, 2);
  //   expect(result).toEqual(Connection);
  // });

  it('should return pending connections', async () => {
      
      const result = await service.getPendingConnections(1);
      expect(result).toEqual([{since: undefined, user: {id: 1}}]);
  });

  it('should return accepted connections', async () => {
      
      const result = await service.getAcceptedConnections(1);
      expect(result).toEqual([{since: undefined, user: undefined}]);
  });

  it('should return connection status', async () => {

    const result = await service.getConnectionStatus(1, 2);
    expect(result).toEqual('NotConnected');
  });

  it('should accept connection', async () => {

    await service.acceptConnection(1, 2);
    expect(mockConnectionsRepository.update).toHaveBeenCalled();
  });

  it('should reject connection', async () => {

    await service.rejectConnection(1, 2);
    expect(mockConnectionsRepository.delete).toHaveBeenCalled();
  });


});
