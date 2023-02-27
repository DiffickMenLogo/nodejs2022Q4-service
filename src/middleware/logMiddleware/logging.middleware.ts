import { Request, Response, NextFunction, response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new LoggerService('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const protocol = req.protocol;
    const hostname = req.hostname;
    const originalUrl = req.originalUrl;
    const query = req.query;
    const body = req.body;
    // const userAgent = req.get('user-agent') || '';

    response.on('finish', () => {
      const statusCode = res.statusCode;
      //   const length = res.get('content-length');

      const url = `${protocol}://${hostname}${originalUrl}`;

      this.logger.log(
        `Request: Method: ${method}, Url: ${url}, Query: ${JSON.stringify(
          query,
        )}, Body: ${JSON.stringify(
          body,
        )} \n Response: StatusCode: ${statusCode}`,
      );
    });

    next();
  }
}
