import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, role: Role.ADMIN, name: 'Alice', email: 'alice@test.com' },
    { id: 2, role: Role.ENGINEER, name: 'Bob', email: 'bob@test.com' },
    { id: 3, role: Role.INTERN, name: 'Charlie', email: 'charlie@tes.com' },
    { id: 4, role: Role.ADMIN, name: 'David', email: 'david@test.com' },
    { id: 5, role: Role.ENGINEER, name: 'Eve', email: 'eve@test.com' },
  ];

  getUsers(role?: Role) {
    try {
      if (!role) {
        return this.users;
      }

      return this.users.filter((user) => user.role === role);
    } catch (error) {
      throw new HttpException(
        error.message || 'Users could not be retrieved',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getUser(id: number) {
    try {
      const index = this.users.findIndex((user) => user.id === +id);

      if (index <= -1) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return this.users[index];
    } catch (error) {
      throw new HttpException(
        error.message || 'User could not be retrieved',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      const usersByHighestId = this.users.sort((a, b) => +b.id - +a.id);
      const newUser = {
        id: usersByHighestId[0].id + 1,
        ...createUserDto,
      };
      this.users.push(newUser);

      return newUser;
    } catch (error) {
      throw new HttpException(
        error.message || 'User could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const index = this.users.findIndex((user) => user.id === +id);

      if (index <= -1) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      this.users[index] = { ...this.users[index], ...updateUserDto };

      return this.getUser(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'User could not be updated',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  delete(id: number) {
    try {
      const index = this.users.findIndex((user) => user.id === +id);

      if (index <= -1) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const user = this.users[index];
      this.users.splice(index, 1);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'User could not be deleted',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
