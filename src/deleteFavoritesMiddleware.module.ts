import { FavoritesModule } from './favorites/favorites.module';
import { DeleteFavoritesMiddleware } from './deleteFavorites.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

@Module({
  imports: [FavoritesModule],
  controllers: [],
  providers: [DeleteFavoritesMiddleware],
})
export class DeleteFavoritesMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeleteFavoritesMiddleware).forRoutes(
      {
        path: 'track/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'artist/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'album/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
