import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number; // integer number

  @IsString()
  @IsOptional()
  @IsUUID('4')
  readonly artistId?: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  @IsUUID('4')
  readonly albumId?: string | null; // refers to Album
}
