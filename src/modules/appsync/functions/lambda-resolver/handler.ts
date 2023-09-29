import { AppSyncResolverEvent, Handler } from 'aws-lambda';

/**
 * This is the main Lambda handler for all AppSync requests.
 *
 * @param event
 */
const handler: Handler = async (event: AppSyncResolverEvent<any>) => {
  console.log('LAMBDA RESOLVER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(event);

  return [
    {
      qwe: 'asd',
    },
  ];
};

export const main = handler;
