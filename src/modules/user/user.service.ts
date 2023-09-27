import { CreateUserDto } from './dto/create-user.dto';
import { db } from '../../lib/dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DbTable } from '../../enums/db-table';

export class UserService {
  async createUser(userDto: CreateUserDto): Promise<void> {
    await db.send(
      new PutItemCommand({
        TableName: DbTable.Users,
        Item: {
          id: { S: userDto.id },
          createdAt: { S: userDto.createdAt },
          email: { S: userDto.email },
        },
      }),
    );
  }
}
