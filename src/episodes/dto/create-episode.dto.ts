import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsBoolean()
  isFeatured: boolean;
}
