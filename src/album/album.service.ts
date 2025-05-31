import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { IDB } from 'src/common/in-memory-database';

@Injectable()
export class AlbumService {
  private albums = IDB.albums;

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
    //TODO: should set track.albumId = null after delete
    const index = this.albums.findIndex((a) => a.id === id);

    if (index === -1)
      throw new NotFoundException(`Album with id ${id} not found`);

    this.albums.splice(index, 1);
  }
}
