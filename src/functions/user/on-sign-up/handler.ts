import { Handler } from 'aws-lambda';

const handler: Handler = async (event) => {
  console.log('Hooked Event!!!');
  console.log(123123123);
  console.log(event);
};

export const main = handler;
