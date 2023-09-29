import { Handler, PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda';
import { now } from '@src/utils/utils';
import { UserService } from '@src/modules/user/user.service';

const userService = new UserService();

const handler: Handler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
) => {
  await userService.createUser({
    id: event.request.userAttributes.sub,
    createdAt: now(),
    email: event.request.userAttributes.email,
  });
};

export const main = handler;
