import { Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';
import { Fav } from '../favs/entities/fav.entity';

@Injectable()
class InMemoryDataBase {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favs: Fav = { artists: [], albums: [], tracks: [] };
}

export const IDB = new InMemoryDataBase();
