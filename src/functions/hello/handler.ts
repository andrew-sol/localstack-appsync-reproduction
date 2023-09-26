import type { ValidatedEventAPIGatewayProxyEvent } from '../../lib/api-gateway';
import { formatJSONResponse } from '../../lib/api-gateway';
import { middyfy } from '../../lib/lambda';

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
    NODE_ENV: process.env.NODE_ENV,
    event,
  });
};

export const main = middyfy(hello);
