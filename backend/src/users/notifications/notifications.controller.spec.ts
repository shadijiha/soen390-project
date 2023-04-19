import { Test, TestingModule } from '@nestjs/testing';
import { PusherService } from '../../util/pusher/pusher.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notifications } from '../../models/notifications.entity';
import { User } from '../../models/user.entity';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  let mockNotificationRepository = {};
  let mockUserRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService, PusherService,
        {
          provide: getRepositoryToken(Notifications),
          useValue: mockNotificationRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      
      
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
