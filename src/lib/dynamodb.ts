import { DynamoDB } from '@aws-sdk/client-dynamodb';

let endpoint = undefined;

if ('LOCALSTACK_HOSTNAME' in process.env) {
  endpoint = `http://${process.env.LOCALSTACK_HOSTNAME}:4566`;
}

// DynamoDB Client
export const db = new DynamoDB({ region: process.env.AWS_REGION, endpoint });

export const pkUser = (userId: string) => `USER#${userId}`;
export const skProfile = () => 'PROFILE';
