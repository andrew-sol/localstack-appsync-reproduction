export const request = (ctx) => {
  const { limit = 20, nextToken } = ctx.args;

  return {
    operation: 'Scan',
    limit,
    nextToken,
  };
};

export const response = (ctx) => {
  const { items: users = [], nextToken } = ctx.result;

  return { users, nextToken };
};
