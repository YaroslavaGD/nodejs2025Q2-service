import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavsModule)],
})
export class AlbumModule {}
