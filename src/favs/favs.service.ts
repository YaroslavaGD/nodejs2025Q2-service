import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IDB } from '../common/in-memory-database';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  private favs = IDB.favs;

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  findAll() {
    const artists = this.favs.artists.map((id) =>
      this.artistService.findOne(id),
    );
    const albums = this.favs.albums.map((id) => this.albumService.findOne(id));
    const tracks = this.favs.tracks.map((id) => this.trackService.findOne(id));

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    try {
      this.trackService.findOne(id);
      this.favs.tracks.push(id);

      return id;
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

    this.favs.tracks = this.favs.tracks.splice(index, 1);
  }

  addAlbum(id: string) {
    try {
      this.albumService.findOne(id);
      this.favs.albums.push(id);

      return id;
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

    this.favs.albums = this.favs.albums.splice(index, 1);
  }

  addArtist(id: string) {
    try {
      this.artistService.findOne(id);
      this.favs.artists.push(id);

      return id;
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

    this.favs.artists = this.favs.artists.splice(index, 1);
  }
}
