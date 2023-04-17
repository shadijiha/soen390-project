import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { Notifications } from '../../models/notifications.entity';

describe('NotificationsService', () => {
  let service: NotificationsService;

  let mockUsersRepository = {
    findOneBy: jest.fn(() => true),
  };  

  let mockNotificationsRepository = { 
    find: jest.fn(() => []),
    update: jest.fn(() => true),
    delete: jest.fn(() => true),
    save: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Notifications),
          useValue: mockNotificationsRepository,
        }
      
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return all notifications', async () => {
    const allNotifications = await service.getAllNotifications(1);
    expect(allNotifications.length).toEqual(0);
  });

  it('should return all unread notifications', async () => {
    const allNotifications = await service.getUnreadNotifications(1);
    expect(allNotifications.length).toEqual(0);
  });


  it('should mark notification as read', async () => {
    const allNotifications = await service.markAsRead(1);
    expect(mockNotificationsRepository.update).toHaveBeenCalled();
  });

  it('should mark all notifications as read', async () => {
    const allNotifications = await service.markAllAsRead(1);
    expect(mockNotificationsRepository.update).toHaveBeenCalled();
  });

  it('should delete notification', async () => {
    const allNotifications = await service.deleteNotification(1);
    expect(mockNotificationsRepository.delete).toHaveBeenCalled();
  });

  it('should create notification', async () => {
    const allNotifications = await service.createNotification(1,'', "test");
    expect(mockNotificationsRepository.save).toHaveBeenCalled();
  });



});
