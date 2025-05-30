import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  findAll() {
    return plainToInstance(Artist, this.artists);
  }

  findOne(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return plainToInstance(Artist, artist);
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
    //TODO: should set track.artistId to null after deletion
    //TODO: should set album.artistId to null after deletion
    const index = this.artists.findIndex((a) => a.id === id);

    if (index === -1)
      throw new NotFoundException(`Artist with id ${id} not found`);

    this.artists.splice(index, 1);
  }
}
