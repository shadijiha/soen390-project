
import { type ExceptionFilter, Catch, type ArgumentsHost, HttpStatus, Logger } from '@nestjs/common'
import { type Request, type Response } from 'express'

@Catch(Error)
export class GlobalErrorFilter implements ExceptionFilter {
  catch (exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = HttpStatus.BAD_REQUEST

    Logger.error(exception.stack)

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message
      })
  }
}
