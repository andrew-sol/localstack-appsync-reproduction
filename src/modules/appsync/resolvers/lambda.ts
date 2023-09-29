export const request = (ctx) => {
  const { source, args } = ctx;

  return {
    operation: 'Invoke',
    payload: { field: ctx.info.fieldName, arguments: args, source },
  };
};

export const response = (ctx) => {
  return ctx.result;
};
