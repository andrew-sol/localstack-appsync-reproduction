import { AWS } from '@serverless/typescript';
import { DbTable } from '@src/enums/db-table';

export const dynamodbConfig: AWS['resources']['Resources'] = {
  [`${DbTable.Users}Table`]: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:provider.stage}-' + DbTable.Users,
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    },
  },
};
