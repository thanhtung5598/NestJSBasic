import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FilterOption } from './users.controller';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 0,
      name: 'Marius',
    },
    {
      id: 1,
      name: 'Dustin',
    },
    {
      id: 2,
      name: 'Mark',
    },
    {
      id: 3,
      name: 'Marius',
    },
  ];

  findAll(filterOption?: FilterOption): User[] {
    if (filterOption.name) {
      return this.users.filter((user) => user.name === filterOption.name);
    }
    return this.users;
  }
  
  findUserById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = { id: Math.random(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
}
