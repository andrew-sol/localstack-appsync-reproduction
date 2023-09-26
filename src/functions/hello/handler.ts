import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  console.log('HELLO 999999999999999!');

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    qwe: 'asd',
    AWS_NODEJS_CONNECTION_REUSE_ENABLED:
      process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED,
    USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID,
    event,
  });
};

export const main = middyfy(hello);
