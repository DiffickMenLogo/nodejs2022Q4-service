import { ArtistService } from './../artist/artist.service';
export const checkArtist = (id: string, artistService: ArtistService) => {
  const artist = artistService.getArtistById(id);
  if (!artist) {
    throw new Error('Artist not found');
  }
  return artist;
};
