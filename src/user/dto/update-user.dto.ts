import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
