import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavsModule),
  ],
})
export class ArtistModule {}
