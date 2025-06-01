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
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private albums = IDB.albums;

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly tracksService: TrackService,
  ) {}

  findAll() {
    return plainToInstance(Album, this.albums);
  }

  findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return plainToInstance(Album, album);
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
    if (dto.artistId) album.artistId = dto.artistId;

    return plainToInstance(Album, album);
  }

  remove(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);

    if (index === -1)
      throw new NotFoundException(`Album with id ${id} not found`);

    // this.favsService.removeAlbum(id);
    this.tracksService
      .findAll()
      .filter((t) => t.albumId === id)
      .forEach((artitsTrack) =>
        this.tracksService.update(artitsTrack.id, {
          name: artitsTrack.name,
          duration: artitsTrack.duration,
          artistId: artitsTrack.artistId,
          albumId: null,
        }),
      );

    this.albums.splice(index, 1);
  }
}
