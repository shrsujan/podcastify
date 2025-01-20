import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
