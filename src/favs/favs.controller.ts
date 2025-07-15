import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get('/')
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeArtist(id);
  }
}
