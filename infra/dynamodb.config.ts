import { AWS } from '@serverless/typescript';
import { DbTable } from '../src/enums/db-table';

export const dynamodbConfig: AWS['resources']['Resources'] = {
  UsersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: DbTable.Users,
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'createdAt', KeyType: 'RANGE' },
      ],
    },
  },
};
