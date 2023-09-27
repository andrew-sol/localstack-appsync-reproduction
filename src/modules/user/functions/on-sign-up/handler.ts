import { Handler, PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda';
import { UserService } from '../../user.service';

const userService = new UserService();

const handler: Handler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
) => {
  await userService.createUser({
    id: event.request.userAttributes.sub,
    createdAt: new Date().toISOString(),
    email: event.request.userAttributes.email,
  });
};

export const main = handler;
