import { CreateUserDto } from './dto/create-user.dto';
import { db } from '@src/lib/dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DbTable } from '@src/enums/db-table';
import { marshall } from '@aws-sdk/util-dynamodb';
import { dbTableName } from '@src/utils/utils';

export class UserService {
  async createUser(userDto: CreateUserDto): Promise<void> {
    await db.send(
      new PutItemCommand({
        TableName: dbTableName(DbTable.Users),
        Item: marshall(userDto),
      }),
    );
  }
}
