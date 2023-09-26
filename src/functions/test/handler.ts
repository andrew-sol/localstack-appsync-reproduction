import { Handler } from 'aws-lambda';

const handler: Handler = async () => {
  console.log('NODE_ENV');
  console.log(process.env.NODE_ENV);
};

export const main = handler;
