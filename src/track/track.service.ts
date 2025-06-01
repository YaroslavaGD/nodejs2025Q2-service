import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { IDB } from 'src/common/in-memory-database';

@Injectable()
export class TrackService {
  private tracks = IDB.tracks;

  findAll() {
    return plainToInstance(Track, this.tracks);
  }

  findOne(id: string) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    return plainToInstance(Track, track);
  }

  create(dto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = dto;
    const newTrack: Track = {
      id: randomUUID(),
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };

    this.tracks.push(newTrack);
    return plainToInstance(Track, newTrack);
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    track.name = dto.name;
    track.duration = dto.duration;

    track.artistId = dto.artistId ? dto.artistId : null;
    track.albumId = dto.albumId ? dto.albumId : null;

    return plainToInstance(Track, track);
  }

  remove(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1)
      throw new NotFoundException(`Track with id ${id} not found`);

    this.tracks.splice(index, 1);
  }
}
