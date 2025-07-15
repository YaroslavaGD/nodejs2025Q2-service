import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsOptional()
  @IsUUID('4')
  @ValidateIf((_object, value) => value !== null)
  readonly artistId?: string | null; // refers to Artist
}
