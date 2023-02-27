import { LoggingMiddleware } from './logging.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  providers: [LoggingMiddleware],
  exports: [LoggingMiddleware],
})
export class LoggingMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
