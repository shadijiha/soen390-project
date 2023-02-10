import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { User } from '../models/user.entity'
import {
  type FindOptionsRelationByString,
  type FindOptionsRelations
} from 'typeorm'
import { App } from '../app.types'

export interface BearerPayload {
  email: string
  id: number
  getUser: (
    relations?: FindOptionsRelations<User> | FindOptionsRelationByString
  ) => Promise<User>
}

export function error<T extends App.WithStatus> (e: any): T {
  const err = e as Error
  const t: T | any = { errors: [err?.message], status: App.Status?.Failed } // TODO: find a better solution for eslint
  return t
}

/**
 * @example Use this function as decorator on top of controller functions
 * @returns Returns the logged in user
 */
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const payload = request.user as BearerPayload
    return {
      ...payload,
      getUser: async (
        relations: FindOptionsRelations<User> | FindOptionsRelationByString = []
      ) => {
        return await User.findOne({
          where: { id: payload.id },
          relations
        })
      }
    }
  }
)

export class BaseRequest {
  tempFunction (): any {
    return null
  } // TODO: find a better solution for eslint
}
