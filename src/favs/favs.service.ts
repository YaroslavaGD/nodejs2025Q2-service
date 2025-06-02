import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IDB } from '../common/in-memory-database';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  private favs = IDB.favs;
  private albums = IDB.albums;
  private tracks = IDB.tracks;
  private artists = IDB.artists;

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  findAll() {
    const artists = this.favs.artists
      .map((id) => {
        try {
          return this.artistService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const albums = this.favs.albums
      .map((id) => {
        try {
          return this.albumService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const tracks = this.favs.tracks
      .map((id) => {
        try {
          return this.trackService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    try {
      const track = this.trackService.findOne(id);
      this.favs.tracks.push(track.id);

      return track;
    } catch {
      throw new UnprocessableEntityException(
        `Track with id ${id} doesn't exist`,
      );
    }
  }

  removeTrack(id: string) {
    const index = this.favs.tracks.indexOf(id);
    if (index === -1)
      throw new NotFoundException(`Track with id ${id} in favorites not found`);

    // this.favs.tracks = this.favs.tracks.splice(index, 1);
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
  }

  addAlbum(id: string) {
    try {
      const album = this.albumService.findOne(id);
      this.favs.albums.push(album.id);

      return album;
    } catch {
      throw new UnprocessableEntityException(
        `Album with id ${id} doesn't exist`,
      );
    }
  }

  removeAlbum(id: string) {
    const index = this.favs.albums.indexOf(id);
    if (index === -1)
      throw new NotFoundException(`Album with id ${id} in favorites not found`);

    // this.favs.albums = this.favs.albums.splice(index, 1);
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
  }

  addArtist(id: string) {
    try {
      const artist = this.artistService.findOne(id);
      this.favs.artists.push(artist.id);

      return artist;
    } catch {
      throw new UnprocessableEntityException(
        `Artist with id ${id} doesn't exist`,
      );
    }
  }

  removeArtist(id: string) {
    const index = this.favs.artists.indexOf(id);
    if (index === -1)
      throw new NotFoundException(
        `Artist with id ${id} in favorites not found`,
      );

    // this.favs.artists = this.favs.artists.splice(index, 1);
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
  }
}
