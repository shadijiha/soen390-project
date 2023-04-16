import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from '../models/message.entity'
import { Post } from '../models/post.entity'
import { Not, Repository } from 'typeorm'
import { Reported } from '../models/reported.entity'
import { User } from '../models/user.entity'

@Injectable()
export class AdminService {
  constructor (
    @InjectRepository(Message)
    private readonly messagessRepository: Repository<Message>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Reported)
    private readonly reportedRepository: Repository<Reported>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async reportPost (postId: string, reporter: User): Promise<void> {
    // check if report exists
    const reportExists = await this.reportedRepository.findOneBy({ post: { id: parseInt(postId) } })

    if (reportExists != null) {
      throw new Error('Post already reported')
    }

    const postReported = await this.postsRepository.findOne({ where: { id: parseInt(postId) }, relations: ['user'] })

    if (postReported == null) {
      throw new Error('Post not found')
    }

    await this.reportedRepository.save({
      type: 'post',
      status: 'unresolved',
      post: postReported,
      reporter,
      reported: postReported.user,
      reportedFullName: postReported.user.fullName,
      reportedProfilePic: postReported.user.profilePic
    })
  }

  async reportMessage (messageId: string, reporter: User): Promise<void> {
    // check if report exists
    const reportExists = await this.reportedRepository.findOneBy({ message: { id: parseInt(messageId) } })

    if (reportExists != null) {
      throw new Error('Message already reported')
    }

    const messageReported = await this.messagessRepository.findOneBy({ id: parseInt(messageId) })

    if (messageReported == null) {
      throw new Error('Message not found')
    }

    const senderWhoGotReported = await this.usersRepository.findOneBy({ id: messageReported.senderId })

    if (senderWhoGotReported == null) {
      throw new Error('sender not found')
    }

    await this.reportedRepository.save({
      type: 'message',
      status: 'unresolved',
      message: messageReported,
      reporter,
      reported: senderWhoGotReported,
      reportedFullName: senderWhoGotReported.fullName,
      reportedProfilePic: senderWhoGotReported.profilePic
    })
  }

  async getReportedPosts (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'post',
        status: 'unresolved'
      },
      relations: ['post', 'reporter', 'reported'],
      withDeleted: true
    })
  }

  async getResolvedPosts (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'post',
        status: Not('unresolved')
      },
      relations: ['post', 'reporter', 'reported'],
      withDeleted: true
    })
  }

  async getResolvedMessages (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'message',
        status: Not('unresolved')
      },
      relations: ['message', 'reporter', 'reported'],
      withDeleted: true
    })
  }

  async getReportedMessages (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'message',
        status: 'unresolved'
      },
      relations: ['message', 'reporter', 'reported'],
      withDeleted: true
    })
  }

  async resolvePostSafe (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOneBy({ id: parseInt(reportId) })

    if (report == null) {
      throw new Error('Report not found')
    }
    report.status = 'safe'
    await this.reportedRepository.save(report)
  }

  async resolveMessageSafe (reportId: string): Promise<void> {
    const reported = await this.reportedRepository.findOneBy({ id: parseInt(reportId) })

    if (reported == null) {
      throw new Error('Report not found')
    }
    reported.status = 'safe'
    await this.reportedRepository.save(reported)
  }

  async removePost (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOne({
      where: {
        id: parseInt(reportId)
      },

      relations: ['post']
    })

    if (report == null) {
      throw new Error('Report not found')
    }
    report.status = 'warned'
    await this.reportedRepository.save(report)

    await report.post.softRemove()

    // todo: add pusher notification
  }

  async removeMessage (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOne({
      where: {
        id: parseInt(reportId)
      },

      relations: ['message']
    })

    if (report == null) {
      throw new Error('Report not found')
    }
    report.status = 'warned'
    await this.reportedRepository.save(report)

    await report.message.softRemove()

    // todo: add pusher notification
  }

  async banUserPost (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOne({
      where: {
        id: parseInt(reportId)
      },

      relations: ['post']
    })

    if (report == null) {
      throw new Error('Report not found')
    }

    report.status = 'banned'
    await this.reportedRepository.save(report)

    const posterToBeBanned = (
      await this.postsRepository.findOne({
        where: {
          id: report.post.id
        },
        relations: ['user']
      })
    )?.user

    if (posterToBeBanned != null) {
      posterToBeBanned.type = 'banned'
      await posterToBeBanned.softRemove()
    }
  }

  async banUserMessage (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOne({
      where: {
        id: parseInt(reportId)
      },

      relations: ['message']
    })

    if (report == null) {
      throw new Error('Report not found')
    }

    report.status = 'banned'
    await this.reportedRepository.save(report)

    const senderToBeBanned = await this.usersRepository.findOne({
      where: {
        id: report.message.senderId
      }
    })

    if (senderToBeBanned != null) {
      senderToBeBanned.type = 'banned'
      await senderToBeBanned.softRemove()
    }
  }
}
