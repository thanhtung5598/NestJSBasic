import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiPropertyOptional,
  ApiProperty,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

export class FilterOption {
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  age: number;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  getAllUser(@Query() filterOption: FilterOption): User[] {
    return this.usersService.findAll(filterOption);
  }

  @ApiOkResponse({ type: User, isArray: false })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findUserById(Number(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
