import { DeleteFavoritesMiddleware } from './deleteFavorites.middleware';

describe('DeleteFavoritesMiddleware', () => {
  it('should be defined', () => {
    expect(new DeleteFavoritesMiddleware()).toBeDefined();
  });
});
