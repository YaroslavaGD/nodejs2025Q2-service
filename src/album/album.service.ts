import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { IDB } from '../common/in-memory-database';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumService {
  private albums = IDB.albums;

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly tracksService: TrackService,
    @Inject(forwardRef(() => TrackService))
    private readonly favsService: FavsService,
  ) {}

  findAll() {
    return plainToInstance(Album, this.albums);
  }

  findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return album ? plainToInstance(Album, album) : null;
  }

  create(dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;
    const newAlbum: Album = {
      id: randomUUID(),
      name,
      year,
      artistId: artistId || null,
    };

    this.albums.push(newAlbum);
    return plainToInstance(Album, newAlbum);
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId ? dto.artistId : null;

    return plainToInstance(Album, album);
  }

  removeAllArtistIds(id: string) {
    this.findAll()
      .filter((t) => t.artistId === id)
      .forEach((artistAlbum) =>
        this.update(artistAlbum.id, {
          name: artistAlbum.name,
          year: artistAlbum.year,
          artistId: null,
        }),
      );
  }

  remove(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);

    if (index === -1)
      throw new NotFoundException(`Album with id ${id} not found`);
    this.albums.splice(index, 1);
    try {
      this.tracksService.removeAllAlbumIds(id);
      this.favsService.removeAlbum(id);
    } catch {}
  }
}
