import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'node:crypto';
import { plainToInstance } from 'class-transformer';
import { IDB } from '../common/in-memory-database';

@Injectable()
export class UserService {
  private users = IDB.users;

  findAll() {
    return plainToInstance(User, this.users);
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return plainToInstance(User, user);
  }

  create(dto: CreateUserDto) {
    const time = Date.now();

    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    };

    this.users.push(newUser);

    return plainToInstance(User, newUser);
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return plainToInstance(User, user);
  }

  remove(id: string) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found`);

    this.users.splice(index, 1);
  }
}
