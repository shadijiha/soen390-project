import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Notifications } from '../../models/notifications.entity'
import { Repository } from 'typeorm'
import { User } from '../../models/user.entity'

@Injectable()
export class NotificationsService {
  constructor (
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getAllNotifications (userId: number): Promise<Notifications[]> {
    return await this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' }
    })
  }

  async getUnreadNotifications (userId: number): Promise<Notifications[]> {
    return await this.notificationsRepository.find({
      where: { user: { id: userId }, read: false },
      order: { created_at: 'DESC' }
    })
  }

  async markAsRead (notificationId: number): Promise<void> {
    await this.notificationsRepository.update({ id: notificationId }, { read: true })
  }

  async markAllAsRead (userId: number): Promise<void> {
    await this.notificationsRepository.update({ user: { id: userId }, read: false }, { read: true })
  }

  async deleteNotification (notificationId: number): Promise<void> {
    await this.notificationsRepository.delete({ id: notificationId })
  }

  async createNotification (userId: number, type: string, text: string, photo?: string, link?: string, title?: string): Promise<Notifications> {
    const user = await this.usersRepository.findOneBy({ id: userId })

    if (user == null) {
      throw new Error('User not found')
    }

    const notification = new Notifications()
    notification.type = type
    notification.text = text
    notification.photo = photo !== undefined ? photo : null
    notification.link = link !== undefined ? link : null
    notification.title = title !== undefined ? title : null
    notification.read = false
    notification.user = user
    await this.notificationsRepository.save(notification)

    return notification
  }
}
