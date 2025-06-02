import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { IDB } from '../common/in-memory-database';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  private artists = IDB.artists;

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly tracksService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumsService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  findAll() {
    return plainToInstance(Artist, this.artists);
  }

  findOne(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return artist ? plainToInstance(Artist, artist) : null;
  }

  create(dto: CreateArtistDto) {
    const newArtist: Artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };

    this.artists.push(newArtist);
    return plainToInstance(Artist, newArtist);
  }

  update(id: string, dto: UpdateArtistDto) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return plainToInstance(Artist, artist);
  }

  remove(id: string) {
    const index = this.artists.findIndex((a) => a.id === id);

    if (index === -1)
      throw new NotFoundException(`Artist with id ${id} not found`);
    this.artists.splice(index, 1);

    try {
      this.tracksService.removeAllArtistIds(id);
      this.albumsService.removeAllArtistIds(id);
      this.favsService.removeArtist(id);
    } catch {}
  }
}
