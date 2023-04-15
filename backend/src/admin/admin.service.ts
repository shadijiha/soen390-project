import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from '../models/message.entity'
import { Post } from '../models/post.entity'
import { Repository } from 'typeorm'
import { Reported } from '../models/reported.entity'
import { type User } from '../models/user.entity'

@Injectable()
export class AdminService {
  constructor (
    @InjectRepository(Message)
    private readonly messagessRepository: Repository<Message>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Reported)
    private readonly reportedRepository: Repository<Reported>
  ) {}

  async reportPost (postId: string, reporter: User): Promise<void> {
    // check if report exists
    const reportExists = await this.reportedRepository.findOneBy({ post: { id: parseInt(postId) } })

    if (reportExists != null) {
      throw new Error('Post already reported')
    }

    const postReported = await this.postsRepository.findOneBy({ id: parseInt(postId) })

    if (postReported == null) {
      throw new Error('Post not found')
    }

    await this.reportedRepository.save({
      type: 'post',
      status: 'unresolved',
      post: postReported,
      reporter
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

    await this.reportedRepository.save({
      type: 'message',
      status: 'unresolved',
      message: messageReported,
      reporter
    })
  }

  async getReportedPosts (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'post',
        status: 'unresolved'
      },
      relations: ['post', 'reporter']
    })
  }

  async getReportedMessages (): Promise<Reported[]> {
    return await this.reportedRepository.find({
      where: {
        type: 'message',
        status: 'unresolved'
      },
      relations: ['message', 'reporter']
    })
  }

  async resolvePost (reportId: string): Promise<void> {
    const report = await this.reportedRepository.findOneBy({ id: parseInt(reportId) })

    if (report == null) {
      throw new Error('Report not found')
    }
    report.status = 'resolved'
    await this.reportedRepository.save(report)
  }

  async resolveMessage (reportId: string): Promise<void> {
    const reported = await this.reportedRepository.findOneBy({ id: parseInt(reportId) })

    if (reported == null) {
      throw new Error('Report not found')
    }
    reported.status = 'resolved'
    await this.reportedRepository.save(reported)
  }
}
