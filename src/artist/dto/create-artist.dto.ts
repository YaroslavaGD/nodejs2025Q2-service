import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
