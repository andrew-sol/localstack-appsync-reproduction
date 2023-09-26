import { Handler, PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { db, pkUser, skProfile } from '../../../lib/dynamodb';

const handler: Handler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
) => {
  await db.send(
    new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: {
        pk: { S: pkUser(event.request.userAttributes.sub) },
        sk: { S: skProfile() },
        email: { S: event.request.userAttributes.email },
      },
    }),
  );
};

export const main = handler;
