import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.databaseService.employee.create({
        data: createEmployeeDto,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.state || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(role?: Role) {
    try {
      return await this.databaseService.employee.findMany({
        where: role ? { role } : undefined,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.state || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.employee.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.state || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      return await this.databaseService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.state || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.state || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
