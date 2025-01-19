import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(
  PickType(CreateUserDto, ['role']),
) {}
